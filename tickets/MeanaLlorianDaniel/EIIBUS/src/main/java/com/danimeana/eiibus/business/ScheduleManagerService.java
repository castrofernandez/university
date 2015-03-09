package com.danimeana.eiibus.business;

import java.util.List;

import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.Trip;

public interface ScheduleManagerService {

	public List<Schedule> getSchedulesByTripAndDateOrderByDeparture(Trip trip, String dateStr);

	public Schedule saveSchedule(Schedule schedule);

	public Schedule getScheduleById(int id);

	public List<Schedule> getSchedulesByOriginIdAndDestinationIdAndDateOrderByDeparture(int originId,
			int destinationId, String departureDate);

}
