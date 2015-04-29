package com.danimeana.eiibus.presentation.reserve;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.danimeana.eiibus.business.CityManagerService;
import com.danimeana.eiibus.business.ExtraManagerService;
import com.danimeana.eiibus.business.ReserveManagerService;
import com.danimeana.eiibus.business.ScheduleManagerService;
import com.danimeana.eiibus.business.TripManagerService;
import com.danimeana.eiibus.business.UserManagerService;
import com.danimeana.eiibus.infrastructure.DateTimeUtil;
import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.model.Extra;
import com.danimeana.eiibus.model.ExtraType;
import com.danimeana.eiibus.model.Reserve;
import com.danimeana.eiibus.model.ReserveType;
import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.User;
import com.danimeana.eiibus.presentation.profile.dto.UserDTO;
import com.danimeana.eiibus.presentation.reserve.dto.ReserveDTO;
import com.danimeana.eiibus.presentation.reserve.dto.ScheduleDTO;
import com.danimeana.eiibus.presentation.reserve.dto.SeatDTO;
import com.danimeana.eiibus.presentation.reserve.validator.SchedulesValidator;
import com.danimeana.eiibus.presentation.reserve.validator.SearchValidator;
import com.danimeana.eiibus.presentation.reserve.validator.SeatsValidator;

@Controller
public class ReserveController {

	@Autowired
	private CityManagerService cityManagerService;

	@Autowired
	private TripManagerService tripManagerService;

	@Autowired
	private ReserveManagerService reserveManagerService;

	@Autowired
	private ScheduleManagerService scheduleManagerService;

	@Autowired
	private UserManagerService userManagerService;

	@Autowired
	private ExtraManagerService extraManagerService;

	@RequestMapping(value = "search")
	public String prepareSearch(@ModelAttribute("ReserveDTO") ReserveDTO reserveDTO, Model model) {
		loadCities(model);
		return "search";
	}

	@RequestMapping(value = "findDestinations", method = RequestMethod.POST)
	public @ResponseBody String findDestinations(@RequestParam String id) {
		List<City> destinations;
		try {
			destinations = tripManagerService.getDestinationsByOriginId(Integer.parseInt(id));
		} catch (NumberFormatException e) {
			destinations = new ArrayList<City>();
		}
		ObjectMapper mapper = new ObjectMapper();
		String json = "{}";
		try {
			json = mapper.writeValueAsString(destinations);
		} catch (Exception e) {
			return json;
		}
		return json;
	}

	@RequestMapping(value = "schedules", method = RequestMethod.GET)
	public String search(@Valid @ModelAttribute("ReserveDTO") ReserveDTO reserveDTO, BindingResult result, Model model) {

		if (!validate(reserveDTO, result, new SearchValidator())) {
			loadCities(model);
			return "search";
		}

		loadSchedulesData(reserveDTO, model);
		return "schedules";
	}

	private void loadCities(Model model) {
		List<City> cities = cityManagerService.getCities();
		model.addAttribute("cities", cities);
	}

	@RequestMapping(value = "seats", method = RequestMethod.GET)
	public String seats(@Valid @ModelAttribute("ReserveDTO") ReserveDTO reserveDTO, BindingResult result,
			HttpSession session, Model model) {

		if (!validate(reserveDTO, result, new SearchValidator())) {
			model.addAttribute("error", "errors.error");
			return "error";
		}

		if (!validate(reserveDTO, result, new SchedulesValidator())) {
			loadSchedulesData(reserveDTO, model);
			return "schedules";
		}

		Schedule departureSchedule = scheduleManagerService.getScheduleById(reserveDTO.getDepartureSchedule());
		Date departureDate = DateTimeUtil.getDateFromString(reserveDTO.getDepartureDate());
		if (!validDepartureSchedule(departureSchedule, departureDate)) {
			loadSchedulesData(reserveDTO, model);
			model.addAttribute("msgError", "errors.schedules.departure.later");
			return "schedules";
		}

		if (reserveDTO.getType() == ReserveType.RETURN) {
			Schedule returnSchedule = scheduleManagerService.getScheduleById(reserveDTO.getReturnSchedule());
			Date returnDate = DateTimeUtil.getDateFromString(reserveDTO.getReturnDate());
			if (!validReturnSchedule(departureSchedule, returnSchedule, departureDate, returnDate)) {
				loadSchedulesData(reserveDTO, model);
				model.addAttribute("msgError", "errors.schedules.return.later");
				return "schedules";
			}
		}
		loadSeatsData(reserveDTO, session, model);
		return "seats";
	}

	@RequestMapping(value = "summary", method = RequestMethod.GET)
	private String summary(@Valid @ModelAttribute("ReserveDTO") ReserveDTO reserveDTO, BindingResult result,
			HttpSession session, Model model) {

		if (!validate(reserveDTO, result, new SearchValidator(), new SchedulesValidator())) {
			model.addAttribute("error", "errors.error");
			return "error";
		}

		if (!validate(reserveDTO, result, new SeatsValidator())) {
			loadSeatsData(reserveDTO, session, model);
			return "seats";
		}
		loadSummaryData(reserveDTO, model);
		User user = loadUserData(session, model);
		if (user == null) {
			model.addAttribute("error", "errors.authentication");
			return "error";
		}
		model.addAttribute("user", user);
		return "summary";
	}

	@RequestMapping(value = "confirm", method = RequestMethod.POST)
	private String confirm(@ModelAttribute("ReserveDTO") ReserveDTO reserveDTO, BindingResult result,
			HttpSession session, Model model) {

		if (!validate(reserveDTO, result, new SearchValidator(), new SchedulesValidator(), new SeatsValidator())) {
			model.addAttribute("error", "errors.error");
			return "error";
		}

		Reserve reserve = new Reserve();
		reserve.setType(reserveDTO.getType());
		reserve.setDepartureDate(DateTimeUtil.getDateFromString(reserveDTO.getDepartureDate()));

		User user = loadUserData(session, model);
		if (user == null) {
			model.addAttribute("error", "errors.authentication");
			return "error";
		}
		model.addAttribute("user", UserDTO.getUserDTO(user));
		reserve.setUser(user);

		int departureScheduleId = reserveDTO.getDepartureSchedule();
		Schedule departureSchedule = scheduleManagerService.getScheduleById(departureScheduleId);
		ScheduleDTO departureScheduleDTO = ScheduleDTO.getScheduleDTO(departureSchedule);
		model.addAttribute("departureSchedule", departureScheduleDTO);
		reserve.setDepartureSchedule(departureSchedule);

		if (!validSeatReserved(reserveDTO.getDepartureSeats(), departureSchedule,
				DateTimeUtil.getDateFromString(reserveDTO.getDepartureDate()))) {
			model.addAttribute("error", "errors.reserve.seat.not.free");
			return "error";
		}
		List<Integer> departureSeats = new ArrayList<Integer>(reserveDTO.getDepartureSeats());
		Collections.sort(departureSeats);

		model.addAttribute("departureSeats", departureSeats);
		reserve.setDepartureSeats(reserveDTO.getDepartureSeats());

		Map<String, Double> prices = new HashMap<String, Double>();
		double departurePrice = departureSchedule.getPrice() * reserveDTO.getPassengers();
		prices.put("reserve.outbound.travel", departurePrice);
		double returnPrice = 0;

		if (reserveDTO.getType() == ReserveType.RETURN) {
			reserve.setReturnDate(DateTimeUtil.getDateFromString(reserveDTO.getReturnDate()));

			int returnScheduleId = reserveDTO.getReturnSchedule();
			Schedule returnSchedule = scheduleManagerService.getScheduleById(returnScheduleId);
			ScheduleDTO returnScheduleDTO = ScheduleDTO.getScheduleDTO(returnSchedule);
			model.addAttribute("returnSchedule", returnScheduleDTO);
			reserve.setReturnSchedule(returnSchedule);

			if (!validSeatReserved(reserveDTO.getReturnSeats(), returnSchedule,
					DateTimeUtil.getDateFromString(reserveDTO.getReturnDate()))) {
				model.addAttribute("error", "errors.reserve.seat.not.free");
				return "error";
			}
			List<Integer> returnSeats = new ArrayList<Integer>(reserveDTO.getReturnSeats());
			Collections.sort(returnSeats);
			model.addAttribute("returnSeats", returnSeats);
			reserve.setReturnSeats(reserveDTO.getReturnSeats());

			returnPrice = returnSchedule.getPrice() * reserveDTO.getPassengers();
			prices.put("reserve.inbound.travel", returnPrice);
		} else if (reserveDTO.getType() == ReserveType.OPENRETURN) {
			returnPrice = departureSchedule.getPrice() * reserveDTO.getPassengers();
			prices.put("reserve.inbound.travel.open.return", returnPrice);
		}

		double total = departurePrice + returnPrice;
		Set<ExtraType> extras = reserveDTO.getExtras();
		Set<Extra> fullExtras = new HashSet<Extra>();
		if (extras != null) {
			for (ExtraType extraType : extras) {
				Extra extra = extraManagerService.getExtraByExtraType(extraType);
				fullExtras.add(extra);
				prices.put("reserve.extra." + extra.getType().name().toLowerCase(), extra.getPrice());
				total += extra.getPrice();
			}
			reserve.setExtras(fullExtras);
		}
		model.addAttribute("prices", prices);
		model.addAttribute("total", total);

		if (!validateToReserve(reserve)) {
			model.addAttribute("error", "errors.error");
			return "error";
		}

		reserve = reserveManagerService.saveReserve(reserve);
		model.addAttribute("reserveId", reserve.getId());
		return "summary";
	}
	
	@RequestMapping(value = "survey", method = RequestMethod.POST)
	private String survey(@ModelAttribute("ReserveDTO") ReserveDTO reserveDTO, BindingResult result,
			HttpSession session, Model model) {
		return "survey";
	}

	private void loadSchedulesData(ReserveDTO reserveDTO, Model model) {
		List<Schedule> departureSchedules = scheduleManagerService
				.getSchedulesByOriginIdAndDestinationIdAndDateOrderByDeparture(reserveDTO.getOrigin(),
						reserveDTO.getDestination(), reserveDTO.getDepartureDate());
		List<ScheduleDTO> departureSchedulesDTO = getSchedulesDTO(departureSchedules, reserveDTO.getDepartureDate());
		model.addAttribute("departureSchedules", departureSchedulesDTO);
		if (reserveDTO.getDepartureSchedule() == null)
			reserveDTO.setDepartureSchedule(departureSchedulesDTO.get(0).getId());
		if (reserveDTO.getType() == ReserveType.RETURN) {
			List<Schedule> returnSchedules = scheduleManagerService
					.getSchedulesByOriginIdAndDestinationIdAndDateOrderByDeparture(reserveDTO.getDestination(),
							reserveDTO.getOrigin(), reserveDTO.getReturnDate());
			List<ScheduleDTO> returnSchedulesDTO = getSchedulesDTO(returnSchedules, reserveDTO.getReturnDate());
			model.addAttribute("returnSchedules", returnSchedulesDTO);
			if (reserveDTO.getReturnSchedule() == null)
				reserveDTO.setReturnSchedule(returnSchedulesDTO.get(0).getId());
		}
	}

	private List<ScheduleDTO> getSchedulesDTO(List<Schedule> schedules, String date) {
		List<ScheduleDTO> schedulesDTO = new ArrayList<ScheduleDTO>();
		for (Schedule schedule : schedules) {
			int seatsInBus = schedule.getBus().getSeats();
			int seatsReserved = reserveManagerService.getSeatsReservedByDateAndSchedule(
					DateTimeUtil.getDateFromString(date), schedule).size();
			schedule.getBus().setSeats(seatsInBus - seatsReserved);
			schedulesDTO.add(ScheduleDTO.getScheduleDTO(schedule));
			schedule.getBus().setSeats(seatsInBus);
		}
		return schedulesDTO;
	}

	private User loadUserData(HttpSession session, Model model) {
		Object inSession = session.getAttribute("userEmail");
		String userEmail = inSession == null ? "" : (String) inSession;
		User user = userManagerService.getUserByEmail(userEmail);
		return user;
	}

	private void loadSeatsData(ReserveDTO reserveDTO, HttpSession session, Model model) {
		model.addAttribute("user", loadUserData(session, model));

		Schedule departureSchedule = scheduleManagerService.getScheduleById(reserveDTO.getDepartureSchedule());
		List<Integer> departureSeatsReserved = reserveManagerService.getSeatsReservedByDateAndSchedule(
				DateTimeUtil.getDateFromString(reserveDTO.getDepartureDate()), departureSchedule);
		model.addAttribute("departureSeats",
				getSeatsMatrix(departureSeatsReserved, departureSchedule.getBus().getSeats()));
		if (reserveDTO.getType() == ReserveType.RETURN) {
			Schedule returnSchedule = scheduleManagerService.getScheduleById(reserveDTO.getReturnSchedule());
			List<Integer> returnSeatsReserved = reserveManagerService.getSeatsReservedByDateAndSchedule(
					DateTimeUtil.getDateFromString(reserveDTO.getReturnDate()), returnSchedule);
			model.addAttribute("returnSeats", getSeatsMatrix(returnSeatsReserved, returnSchedule.getBus().getSeats()));
		}
		List<Extra> extras = extraManagerService.getExtrasOrderByPrice();
		model.addAttribute("extras", extras);
	}

	private List<List<SeatDTO>> getSeatsMatrix(List<Integer> seatsReserved, int totalSeats) {
		List<List<SeatDTO>> seatsMatrix = new ArrayList<List<SeatDTO>>();
		List<SeatDTO> seatsRow = new ArrayList<SeatDTO>();
		for (int i = 1; i <= totalSeats; i++) {
			if (seatsReserved.contains(i))
				seatsRow.add(new SeatDTO(i, false));
			else
				seatsRow.add(new SeatDTO(i, true));
			if (i % 4 == 0) {
				seatsMatrix.add(seatsRow);
				seatsRow = new ArrayList<SeatDTO>();
			}
		}
		return seatsMatrix;
	}

	private void loadSummaryData(ReserveDTO reserveDTO, Model model) {
		int departureScheduleId = reserveDTO.getDepartureSchedule();
		Schedule departureSchedule = scheduleManagerService.getScheduleById(departureScheduleId);
		ScheduleDTO departureScheduleDTO = ScheduleDTO.getScheduleDTO(departureSchedule);
		model.addAttribute("departureSchedule", departureScheduleDTO);

		List<Integer> departureSeats = new ArrayList<Integer>(reserveDTO.getDepartureSeats());
		Collections.sort(departureSeats);
		model.addAttribute("departureSeats", departureSeats);

		Map<String, Double> prices = new HashMap<String, Double>();
		double departurePrice = departureSchedule.getPrice() * reserveDTO.getPassengers();
		prices.put("reserve.outbound.travel", departurePrice);

		double returnPrice = 0;
		if (reserveDTO.getType() == ReserveType.RETURN) {
			int returnScheduleId = reserveDTO.getReturnSchedule();
			Schedule returnSchedule = scheduleManagerService.getScheduleById(returnScheduleId);
			ScheduleDTO returnScheduleDTO = ScheduleDTO.getScheduleDTO(returnSchedule);
			model.addAttribute("returnSchedule", returnScheduleDTO);

			List<Integer> returnSeats = new ArrayList<Integer>(reserveDTO.getReturnSeats());
			Collections.sort(returnSeats);
			model.addAttribute("returnSeats", returnSeats);

			returnPrice = returnSchedule.getPrice() * reserveDTO.getPassengers();
			prices.put("reserve.inbound.travel", returnPrice);
		} else if (reserveDTO.getType() == ReserveType.OPENRETURN) {
			returnPrice = departureSchedule.getPrice() * reserveDTO.getPassengers();
			prices.put("reserve.inbound.travel.open.return", returnPrice);
		}

		double total = departurePrice + returnPrice;
		Set<ExtraType> extras = reserveDTO.getExtras();
		Set<Extra> fullExtras = new HashSet<Extra>();
		if (extras != null)
			for (ExtraType extraType : extras) {
				Extra extra = extraManagerService.getExtraByExtraType(extraType);
				fullExtras.add(extra);
				prices.put("reserve.extra." + extra.getType().name().toLowerCase(), extra.getPrice());
				total += extra.getPrice();
			}
		model.addAttribute("prices", prices);
		model.addAttribute("total", total);
	}

	private boolean validate(ReserveDTO reserveDTO, BindingResult result, Validator... validators) {
		for (Validator validator : validators) {
			validator.validate(reserveDTO, result);
			if (result.hasErrors())
				return false;
		}
		return true;
	}

	private boolean validDepartureSchedule(Schedule departureSchedule, Date departureDate) {
		Calendar calendar = Calendar.getInstance();
		String nowHourStr = calendar.get(Calendar.HOUR_OF_DAY) + ":" + calendar.get(Calendar.MINUTE);
		if (departureDate.getTime() - DateTimeUtil.today().getTime() == 0) {
			int minutes = DateTimeUtil.minutesBeetwenTimesSring(departureSchedule.getDeparture(), nowHourStr);
			if (minutes <= 0) {
				return false;
			}
		}
		return true;
	}

	private boolean validReturnSchedule(Schedule departureSchedule, Schedule returnSchedule, Date departureDate,
			Date returnDate) {
		if (returnDate.getTime() - departureDate.getTime() == 0) {
			int minutes = DateTimeUtil.minutesBeetwenTimesSring(returnSchedule.getDeparture(),
					departureSchedule.getDeparture());
			if (minutes <= 0) {
				return false;
			}
		}
		if (!departureSchedule.getTrip().getDestination().equals(returnSchedule.getTrip().getOrigin()))
			return false;
		return true;
	}

	private boolean validSeatReserved(Collection<Integer> seatsReserved, Schedule schedule, Date date) {
		List<Integer> seatsAlreadyReserved = reserveManagerService.getSeatsReservedByDateAndSchedule(date, schedule);
		for (Integer i : seatsReserved) {
			if (seatsAlreadyReserved.contains(i))
				return false;
		}
		return true;
	}

	private boolean validateToReserve(Reserve reserve) {
		if (reserve.getUser() == null)
			return false;
		if (!validDepartureSchedule(reserve.getDepartureSchedule(), reserve.getDepartureDate()))
			return false;
		if (!validSeatReserved(reserve.getDepartureSeats(), reserve.getDepartureSchedule(), reserve.getDepartureDate()))
			return false;
		if (reserve.getType() == ReserveType.RETURN) {
			if (!validReturnSchedule(reserve.getDepartureSchedule(), reserve.getReturnSchedule(),
					reserve.getDepartureDate(), reserve.getReturnDate()))
				return false;
			if (!validSeatReserved(reserve.getReturnSeats(), reserve.getReturnSchedule(), reserve.getReturnDate()))
				return false;
		}
		return true;
	}

	@ModelAttribute("ReserveDTO")
	public ReserveDTO getSearchDTO() {
		ReserveDTO reserve = new ReserveDTO();
		reserve.setType(ReserveType.RETURN);
		return reserve;
	}

}
