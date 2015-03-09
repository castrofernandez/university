package com.danimeana.eiibus.persistence.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.persistence.CityDataService;

@Repository
public class CityDAO implements CityDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<City> findAll() {
		TypedQuery<City> query = em.createQuery("from City c order by c.name", City.class);
		try {
			return query.getResultList();
		} catch (Exception e) {
			return new ArrayList<City>();
		}
	}

	@Override
	public City findById(int id) {
		return em.find(City.class, id);
	}

	@Override
	public City save(City city) {
		em.persist(city);
		return city;
	}

}
