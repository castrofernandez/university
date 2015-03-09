package com.danimeana.eiibus.persistence.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.Bus;
import com.danimeana.eiibus.persistence.BusDataService;

@Repository
public class BusDAO implements BusDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Bus save(Bus bus) {
		em.persist(bus);
		return bus;
	}

}
