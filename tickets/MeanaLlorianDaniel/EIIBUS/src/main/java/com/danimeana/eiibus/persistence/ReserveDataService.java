package com.danimeana.eiibus.persistence;

import java.util.Date;
import java.util.List;

import com.danimeana.eiibus.model.Reserve;
import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.User;

public interface ReserveDataService {

	public Reserve save(Reserve reserve);

	public Reserve findById(String id);

	public List<Reserve> findByDateAndSchedule(Date date, Schedule schedule);

	public void delete(Reserve reserve);

	public List<Reserve> findByUserAndAfterDepartureOrderByDepartureDate(User user, Date date, String departure);

	public List<Reserve> findByUserAndBeforeDepartureOrderByDepartureDate(User user, Date date, String departure);

}
