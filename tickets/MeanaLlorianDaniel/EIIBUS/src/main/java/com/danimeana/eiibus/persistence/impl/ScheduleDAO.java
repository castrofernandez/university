package com.danimeana.eiibus.persistence.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.ScheduleDay;
import com.danimeana.eiibus.model.Trip;
import com.danimeana.eiibus.persistence.ScheduleDataService;

@Repository
public class ScheduleDAO implements ScheduleDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Schedule> findByTripAndDayOrderByDeparture(Trip trip, ScheduleDay day) {
		TypedQuery<Schedule> query = em.createQuery(
				"from Schedule s where s.trip = :trip and :day in elements(s.days) order by s.departure",
				Schedule.class);
		query.setParameter("trip", trip);
		query.setParameter("day", day.name());
		try {
			return query.getResultList();
		} catch (Exception e) {
			return new ArrayList<Schedule>();
		}
	}

	@Override
	public Schedule save(Schedule schedule) {
		em.persist(schedule);
		return schedule;
	}

	@Override
	public List<Schedule> findByTripAndDayOrderByPrice(Trip trip, ScheduleDay day) {
		TypedQuery<Schedule> query = em.createQuery(
				"from Schedule s where s.trip = :trip and :day in elements(s.days) order by s.price", Schedule.class);
		query.setParameter("trip", trip);
		query.setParameter("day", day.name());
		try {
			return query.getResultList();
		} catch (Exception e) {
			return new ArrayList<Schedule>();
		}
	}

	@Override
	public Schedule findById(int id) {
		return em.find(Schedule.class, id);
	}

}
