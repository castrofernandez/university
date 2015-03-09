package com.danimeana.eiibus.business;

import java.util.Date;
import java.util.List;

import com.danimeana.eiibus.model.Reserve;
import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.User;

public interface ReserveManagerService {

	public Reserve saveReserve(Reserve reserve);

	public Reserve getReserveById(String id);

	public List<Reserve> getReservesByDateAndSchedule(Date date, Schedule schedule);
	
	public List<Integer> getSeatsReservedByDateAndSchedule(Date date, Schedule schedule);
	
	public void deleteReserve(Reserve reserve);

	public List<Reserve> getRemainingReservesByUserOrderByDeparture(User user);

	public List<Reserve> getOldReservesByUserOrderByDeparture(User user);
	
}
