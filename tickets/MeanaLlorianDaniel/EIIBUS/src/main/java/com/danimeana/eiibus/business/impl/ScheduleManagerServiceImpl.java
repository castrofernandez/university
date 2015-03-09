package com.danimeana.eiibus.business.impl;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.CityManagerService;
import com.danimeana.eiibus.business.ScheduleManagerService;
import com.danimeana.eiibus.business.TripManagerService;
import com.danimeana.eiibus.infrastructure.DateTimeUtil;
import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.ScheduleDay;
import com.danimeana.eiibus.model.Trip;
import com.danimeana.eiibus.persistence.ScheduleDataService;

@Service
@Transactional
public class ScheduleManagerServiceImpl implements ScheduleManagerService {

	@Autowired
	private ScheduleDataService scheduleDataService;

	@Autowired
	private CityManagerService cityManagerService;

	@Autowired
	private TripManagerService tripManagerService;

	@Override
	public List<Schedule> getSchedulesByTripAndDateOrderByDeparture(Trip trip, String dateStr) {
		Date date = DateTimeUtil.getDateFromString(dateStr);
		ScheduleDay day = DateTimeUtil.getDayFromDate(date);
		return scheduleDataService.findByTripAndDayOrderByDeparture(trip, day);
	}

	@Override
	public Schedule saveSchedule(Schedule schedule) {
		return scheduleDataService.save(schedule);
	}

	@Override
	public Schedule getScheduleById(int id) {
		return scheduleDataService.findById(id);
	}

	@Override
	public List<Schedule> getSchedulesByOriginIdAndDestinationIdAndDateOrderByDeparture(int originId,
			int destinationId, String dateStr) {
		City origin = cityManagerService.getCityById(originId);
		City destination = cityManagerService.getCityById(destinationId);
		Trip trip = tripManagerService.getTripByOriginAndDestination(origin, destination);
		return getSchedulesByTripAndDateOrderByDeparture(trip, dateStr);
	}

}
