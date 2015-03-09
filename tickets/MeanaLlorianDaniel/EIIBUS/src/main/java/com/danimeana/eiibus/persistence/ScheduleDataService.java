package com.danimeana.eiibus.persistence;

import java.util.List;

import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.ScheduleDay;
import com.danimeana.eiibus.model.Trip;

public interface ScheduleDataService {
	
	public Schedule findById(int id);

	public List<Schedule> findByTripAndDayOrderByDeparture(Trip trip, ScheduleDay day);

	public List<Schedule> findByTripAndDayOrderByPrice(Trip trip, ScheduleDay day);

	public Schedule save(Schedule schedule);
}
