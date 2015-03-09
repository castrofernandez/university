package com.danimeana.eiibus.business.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.ReserveManagerService;
import com.danimeana.eiibus.infrastructure.DateTimeUtil;
import com.danimeana.eiibus.model.Reserve;
import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.User;
import com.danimeana.eiibus.persistence.ReserveDataService;

@Service
@Transactional
public class ReserveManagerServiceImpl implements ReserveManagerService {

	@Autowired
	private ReserveDataService reserveDataService;

	@Override
	public Reserve saveReserve(Reserve reserve) {
		String id = RandomStringUtils.randomAlphanumeric(16);
		Reserve reserveInBd = reserveDataService.findById(id);
		while (reserveInBd != null) {
			id = RandomStringUtils.randomAlphanumeric(8);
			reserveInBd = reserveDataService.findById(id);
		}
		reserve.setId(id);
		return reserveDataService.save(reserve);
	}

	@Override
	public Reserve getReserveById(String id) {
		return reserveDataService.findById(id);
	}

	@Override
	public List<Reserve> getReservesByDateAndSchedule(Date date, Schedule schedule) {
		return reserveDataService.findByDateAndSchedule(date, schedule);
	}

	@Override
	public List<Integer> getSeatsReservedByDateAndSchedule(Date date, Schedule schedule) {
		Set<Integer> seats = new HashSet<Integer>();
		List<Reserve> reserves = getReservesByDateAndSchedule(date, schedule);
		for (Reserve reserve : reserves) {
			if (reserve.getDepartureSchedule().equals(schedule))
				seats.addAll(reserve.getDepartureSeats());
			else if (reserve.getReturnSchedule().equals(schedule))
				seats.addAll(reserve.getReturnSeats());
		}
		return new ArrayList<Integer>(seats);
	}

	@Override
	public void deleteReserve(Reserve reserve) {
		reserveDataService.delete(reserve);
	}

	@Override
	public List<Reserve> getRemainingReservesByUserOrderByDeparture(User user) {
		return reserveDataService.findByUserAndAfterDepartureOrderByDepartureDate(user, DateTimeUtil.today(), DateTimeUtil.now());
	}

	@Override
	public List<Reserve> getOldReservesByUserOrderByDeparture(User user) {
		return reserveDataService.findByUserAndBeforeDepartureOrderByDepartureDate(user, DateTimeUtil.today(), DateTimeUtil.now());

	}

}
