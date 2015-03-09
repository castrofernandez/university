package com.danimeana.eiibus.presentation.profile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.danimeana.eiibus.business.ReserveManagerService;
import com.danimeana.eiibus.business.UserManagerService;
import com.danimeana.eiibus.model.DocumentType;
import com.danimeana.eiibus.model.Extra;
import com.danimeana.eiibus.model.Reserve;
import com.danimeana.eiibus.model.ReserveType;
import com.danimeana.eiibus.model.User;
import com.danimeana.eiibus.presentation.profile.dto.ReserveDTO;
import com.danimeana.eiibus.presentation.profile.dto.UserDTO;
import com.danimeana.eiibus.presentation.profile.validator.UserValidator;

@Controller
public class ProfileController {

	@Autowired
	private UserManagerService userManagerService;

	@Autowired
	private ReserveManagerService reserveManagerService;

	@RequestMapping(value = "profile", method = RequestMethod.GET)
	public String index(Model model, HttpSession session) {
		if (!checkUser(session)) {
			model.addAttribute("error", "errors.authentication");
			return "error";
		}
		loadData(session, model);
		return "profile";
	}

	@RequestMapping(value = "profile", method = RequestMethod.POST)
	public String update(@Valid @ModelAttribute(value = "UserDTO") UserDTO userDTO, BindingResult result,
			@ModelAttribute(value = "userEmail") String userEmail, HttpSession session, Model model) {
		if (!checkUser(session)) {
			model.addAttribute("error", "errors.authentication");
			return "error";
		}
		UserValidator validator = new UserValidator();
		validator.validate(userDTO, result);

		if (result.hasErrors()) {
			loadData(session, model);
			return "profile";
		}
		User user = userManagerService.getUserByEmail(userEmail);
		if (user == null || !user.getPassword().equals(userDTO.getOldPassword())) {
			result.rejectValue("oldPassword", "errors.password.not.correct");
			loadData(session, model);
			return "profile";
		}
		user.setName(userDTO.getName());
		user.setLastname(userDTO.getLastname());
		user.setDocumentType(userDTO.getDocumentType());
		user.setDocumentNumber(user.getDocumentNumber());
		String newPassword = userDTO.getPassword();
		if (newPassword != null && !newPassword.isEmpty())
			user.setPassword(newPassword);
		user = userManagerService.updateUser(user);
		model.addAttribute("userEmail", user.getEmail());
		model.addAttribute("userName", user.getName());
		model.addAttribute("UserDTO", UserDTO.getUserDTO(user));
		model.addAttribute("msgSuccess", "profile.update.msg.success");
		loadData(session, model);
		return "profile";
	}

	@RequestMapping(value = "reserve", method = RequestMethod.GET)
	public String reserve(@RequestParam String id, HttpSession session, Model model) {
		if (!checkUser(session)) {
			model.addAttribute("error", "errors.authentication");
			return "error";
		}
		if (id == null || id.isEmpty())
			return "redirect:profile";
		String userEmail = (String) session.getAttribute("userEmail");
		Reserve reserve = reserveManagerService.getReserveById(id);
		if (reserve == null) {
			model.addAttribute("error", "errors.reserve.not.found");
			return "error";
		} else {
			ReserveDTO reserveDTO = ReserveDTO.getReserveDTO(reserve);
			User user = userManagerService.getUserByEmail(userEmail);
			if (!reserve.getUser().equals(user)) {
				model.addAttribute("error", "errors.reserve.not.found");
				return "error";
			}
			UserDTO userDTO = UserDTO.getUserDTO(user);
			reserveDTO.setUser(userDTO);
			model.addAttribute("ReserveDTO", reserveDTO);
			Map<String, Double> prices = new HashMap<String, Double>();
			double departurePrice = reserve.getDepartureSchedule().getPrice() * reserve.getDepartureSeats().size();
			prices.put("reserve.outbound.travel", departurePrice);
			double returnPrice = 0;
			if (reserve.getType() == ReserveType.RETURN) {
				returnPrice = reserve.getReturnSchedule().getPrice() * reserve.getReturnSeats().size();
				prices.put("reserve.inbound.travel", returnPrice);
			} else if (reserveDTO.getType() == ReserveType.OPENRETURN) {
				returnPrice = reserve.getDepartureSchedule().getPrice() * reserve.getDepartureSeats().size();
				prices.put("reserve.inbound.travel.open.return", returnPrice);
			}
			double total = departurePrice + returnPrice;
			Set<Extra> extras = reserve.getExtras();
			if (extras != null)
				for (Extra extra : extras) {
					prices.put("reserve.extra." + extra.getType().name().toLowerCase(), extra.getPrice());
					total += extra.getPrice();
				}
			model.addAttribute("prices", prices);
			model.addAttribute("total", total);

			return "reserve";
		}
	}

	@RequestMapping(value = "cancelReserve", method = RequestMethod.POST)
	public String cancelReserve(@RequestParam String id, HttpSession session, Model model) {
		if (!checkUser(session)) {
			model.addAttribute("error", "errors.authentication");
			return "error";
		}
		String userEmail = (String) session.getAttribute("userEmail");
		Reserve reserve = reserveManagerService.getReserveById(id);
		if (reserve == null || !reserve.getUser().getEmail().equals(userEmail))
			return "reserveNotFound";
		reserveManagerService.deleteReserve(reserve);
		model.addAttribute("msgSuccess", "profile.reserves.cancel.msg.success");
		loadData(session, model);
		return "profile";
	}

	private void loadData(HttpSession session, Model model) {
		Map<DocumentType, String> documentTypes = new LinkedHashMap<DocumentType, String>();
		// The value is used to identify the string on the messages (i18e)
		documentTypes.put(DocumentType.DNI, "dni");
		documentTypes.put(DocumentType.NIE, "nie");
		documentTypes.put(DocumentType.PASSPORT, "passport");
		model.addAttribute("documentTypes", documentTypes);

		String userEmail = (String) session.getAttribute("userEmail");
		User user = userManagerService.getUserByEmail(userEmail);
		model.addAttribute("UserDTO", UserDTO.getUserDTO(user));

		List<Reserve> reserves = reserveManagerService.getRemainingReservesByUserOrderByDeparture(user);
		List<ReserveDTO> reservesDTO = new ArrayList<ReserveDTO>();
		for (Reserve reserve : reserves) {
			ReserveDTO reserveDTO = ReserveDTO.getReserveDTO(reserve);
			reservesDTO.add(reserveDTO);
		}
		model.addAttribute("reserves", reservesDTO);

		List<Reserve> oldReserves = reserveManagerService.getOldReservesByUserOrderByDeparture(user);
		List<ReserveDTO> oldReservesDTO = new ArrayList<ReserveDTO>();
		for (Reserve reserve : oldReserves) {
			ReserveDTO reserveDTO = ReserveDTO.getReserveDTO(reserve);
			oldReservesDTO.add(reserveDTO);
		}
		model.addAttribute("oldReserves", oldReservesDTO);
	}

	private boolean checkUser(HttpSession session) {
		String userEmail = session.getAttribute("userEmail") == null ? null : (String) session
				.getAttribute("userEmail");

		if (userEmail != null) {
			User user = userManagerService.getUserByEmail(userEmail);
			if (user != null)
				return true;
		}
		return false;
	}

}
