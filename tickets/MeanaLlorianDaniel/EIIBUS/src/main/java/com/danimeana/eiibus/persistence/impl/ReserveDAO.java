package com.danimeana.eiibus.persistence.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.Reserve;
import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.User;
import com.danimeana.eiibus.persistence.ReserveDataService;

@Repository
public class ReserveDAO implements ReserveDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Reserve save(Reserve reserve) {
		java.util.Date date = new java.util.Date();
		reserve.setTime(new Timestamp(date.getTime()));
		
		em.persist(reserve);
		return reserve;
	}

	@Override
	public Reserve findById(String id) {
		return em.find(Reserve.class, id);
	}

	@Override
	public List<Reserve> findByDateAndSchedule(Date date, Schedule schedule) {
		TypedQuery<Reserve> query = em
				.createQuery(
						"from Reserve r where (r.departureDate = :date or r.returnDate = :date) and (r.departureSchedule = :schedule or r.returnSchedule = :schedule)",
						Reserve.class);
		query.setParameter("date", date);
		query.setParameter("schedule", schedule);
		try {
			return query.getResultList();
		} catch (Exception e) {
			return new ArrayList<Reserve>();
		}
	}

	@Override
	public void delete(Reserve reserve) {
		reserve = em.merge(reserve);
		em.remove(reserve);
	}

	@Override
	public List<Reserve> findByUserAndAfterDepartureOrderByDepartureDate(User user, Date date, String departure) {
		TypedQuery<Reserve> query = em
				.createQuery(
						"from Reserve r where r.user = :user and r.departureDate > :date or (r.departureDate = :date and r.departureSchedule.departure >= :departure) order by r.departureDate, r.departureSchedule.departure",
						Reserve.class);
		query.setParameter("user", user);
		query.setParameter("date", date);
		query.setParameter("departure", departure);
		try {
			return query.getResultList();
		} catch (Exception e) {
			return new ArrayList<Reserve>();
		}
	}

	@Override
	public List<Reserve> findByUserAndBeforeDepartureOrderByDepartureDate(User user, Date date, String departure) {
		TypedQuery<Reserve> query = em
				.createQuery(
						"from Reserve r where r.user = :user and r.departureDate < :date or (r.departureDate = :date and r.departureSchedule.departure < :departure)  order by r.departureDate, r.departureSchedule.departure",
						Reserve.class);
		query.setParameter("user", user);
		query.setParameter("date", date);
		query.setParameter("departure", departure);
		try {
			return query.getResultList();
		} catch (Exception e) {
			return new ArrayList<Reserve>();
		}
	}
}
