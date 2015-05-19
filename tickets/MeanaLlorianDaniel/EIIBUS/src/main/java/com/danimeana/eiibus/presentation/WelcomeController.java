package com.danimeana.eiibus.presentation;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.danimeana.eiibus.business.BusManagerService;
import com.danimeana.eiibus.business.CityManagerService;
import com.danimeana.eiibus.business.ExtraManagerService;
import com.danimeana.eiibus.business.ScheduleManagerService;
import com.danimeana.eiibus.business.TripManagerService;
import com.danimeana.eiibus.business.UserManagerService;
import com.danimeana.eiibus.model.Bus;
import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.model.DocumentType;
import com.danimeana.eiibus.model.Extra;
import com.danimeana.eiibus.model.ExtraType;
import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.ScheduleDay;
import com.danimeana.eiibus.model.Trip;
import com.danimeana.eiibus.model.User;

@Controller
public class WelcomeController {

	@Autowired
	private CityManagerService cityManagerService;

	@Autowired
	private TripManagerService tripManagerService;

	@Autowired
	private BusManagerService busManagerService;

	@Autowired
	private ScheduleManagerService scheduleManagerService;

	@Autowired
	private ExtraManagerService extraManagerService;

	@Autowired
	private UserManagerService userManagerService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(Locale locale, HttpSession session) {
		return "redirect:index";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/errors/{code}")
	public String handleException(@PathVariable Integer code, Model model) {
		if (code == 404 || code == 405)
			model.addAttribute("error", "errors.404");
		else
			model.addAttribute("error", "errors");
		return "error";
	}

	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpSession session) {
		session.removeAttribute("userEmail");
		session.removeAttribute("userName");
		return "redirect:index";
	}

	@RequestMapping(value = "init")
	public String init() {
		// # Cities
		City paris = new City("PARIS");
		cityManagerService.saveCity(paris);
		City berlin = new City("BERLIN");
		cityManagerService.saveCity(berlin);
		City dublin = new City("DUBLIN");
		cityManagerService.saveCity(dublin);
		City oslo = new City("OSLO");
		cityManagerService.saveCity(oslo);
		City amsterdam = new City("AMSTERDAM");
		cityManagerService.saveCity(amsterdam);

		// # Trips
		Trip oviedoGijon = new Trip(paris, berlin);
		tripManagerService.saveTrip(oviedoGijon);
		Trip gijonOviedo = new Trip(berlin, paris);
		tripManagerService.saveTrip(gijonOviedo);
		Trip oviedoAviles = new Trip(paris, dublin);
		tripManagerService.saveTrip(oviedoAviles);
		Trip avilesOviedo = new Trip(dublin, paris);
		tripManagerService.saveTrip(avilesOviedo);
		Trip oviedoPola = new Trip(paris, oslo);
		tripManagerService.saveTrip(oviedoPola);
		Trip polaOviedo = new Trip(oslo, paris);
		tripManagerService.saveTrip(polaOviedo);
		Trip oviedoNavia = new Trip(paris, amsterdam);
		tripManagerService.saveTrip(oviedoNavia);
		Trip naviaOviedo = new Trip(amsterdam, paris);
		tripManagerService.saveTrip(naviaOviedo);

		// # Buses
		Bus bus1 = new Bus(40);
		busManagerService.saveBus(bus1);
		Bus bus2 = new Bus(32);
		busManagerService.saveBus(bus2);
		Bus bus3 = new Bus(52);
		busManagerService.saveBus(bus3);
		Bus bus4 = new Bus(44);
		busManagerService.saveBus(bus4);

		// # Schedules
		createSchedules(oviedoGijon, "10:00", 30, 10, 30, 3.50, bus1);
		createSchedules(gijonOviedo, "10:30", 30, 10, 30, 2.50, bus1);
		createSchedules(oviedoAviles, "08:00", 45, 8, 75, 3.75, bus2);
		createSchedules(avilesOviedo, "09:00", 45, 8, 75, 1.15, bus2);
		createSchedules(oviedoPola, "11:00", 30, 8, 30, 1.50, bus3);
		createSchedules(polaOviedo, "12:30", 30, 8, 30, 2.65, bus3);
		createSchedules(oviedoNavia, "07:00", 120, 5, 120, 2.55, bus4);
		createSchedules(naviaOviedo, "09:00", 120, 4, 120, 1.25, bus4);

		// # Extras
		Extra bike = new Extra(ExtraType.BIKE, 1);
		extraManagerService.saveExtra(bike);
		Extra pet = new Extra(ExtraType.PET, 2);
		extraManagerService.saveExtra(pet);
		Extra insurance = new Extra(ExtraType.INSURANCE, 3);
		extraManagerService.saveExtra(insurance);

		// # User
		User user = new User("uo219171@uniovi.es", "12341234", "Daniel", "Meana", DocumentType.DNI, "53509030J", "MAN");
		userManagerService.addUser(user);
		
		return "redirect:index";
	}

	private void createSchedules(Trip trip, String firstDeparture, int duration, int departures, int offset,
			double price, Bus bus) {
		
		double[] prices = {3.50, 2.50, 3.75, 1.15, 1.50, 2.65, 2.55, 1.25};
		
		for (int i = 0; i < departures; i++) {
			List<ScheduleDay> weekdays = new ArrayList<ScheduleDay>();
			weekdays.add(ScheduleDay.MONDAY);
			weekdays.add(ScheduleDay.TUESDAY);
			weekdays.add(ScheduleDay.WEDNESDAY);
			weekdays.add(ScheduleDay.THURSDAY);
			weekdays.add(ScheduleDay.FRIDAY);
			
			double newPrice = prices[i % prices.length];
			
			scheduleManagerService.saveSchedule(new Schedule(trip, getHourStr(firstDeparture, i * (duration + offset)),
					duration, newPrice, weekdays, bus));
			List<ScheduleDay> weekend = new ArrayList<ScheduleDay>();
			weekend.add(ScheduleDay.SATURDAY);
			weekend.add(ScheduleDay.SUNDAY);
			scheduleManagerService.saveSchedule(new Schedule(trip, getHourStr(firstDeparture, i * (duration + offset)),
					duration, newPrice, weekend, bus));
		}
	}

	private String getHourStr(String departure, int offset) {
		String[] firstDepartureSplits = departure.split(":");
		int hour = Integer.parseInt(firstDepartureSplits[0]);
		int minutes = Integer.parseInt(firstDepartureSplits[1]);
		minutes += offset;
		if (minutes > 59) {
			hour += minutes / 60;
			minutes = minutes % 60;
		}
		return ((hour < 10) ? "0" + hour : hour) + ":" + ((minutes < 10) ? "0" + minutes : minutes);
	}

}
