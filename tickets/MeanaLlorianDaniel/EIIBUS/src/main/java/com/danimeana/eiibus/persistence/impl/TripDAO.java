package com.danimeana.eiibus.persistence.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.model.Trip;
import com.danimeana.eiibus.persistence.TripDataService;

@Repository
public class TripDAO implements TripDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Trip> findByOrigin(City origin) {
		TypedQuery<Trip> query = em.createQuery("from Trip t where t.origin = :origin", Trip.class);
		query.setParameter("origin", origin);
		try {
			return query.getResultList();
		} catch (Exception e) {
			return new ArrayList<Trip>();
		}
	}

	@Override
	public Trip findByOriginAndDestination(City origin, City destination) {
		TypedQuery<Trip> query = em.createQuery(
				"from Trip t where t.origin = :origin and t.destination = :destination", Trip.class);
		query.setParameter("origin", origin);
		query.setParameter("destination", destination);
		return query.getSingleResult();
	}

	@Override
	public Trip save(Trip trip) {
		em.persist(trip);
		return trip;
	}

}
