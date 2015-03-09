package com.danimeana.eiibus.persistence.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.Extra;
import com.danimeana.eiibus.model.ExtraType;
import com.danimeana.eiibus.persistence.ExtraDataService;

@Repository
public class ExtraDAO implements ExtraDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Extra> findAllOrderByPrice() {
		TypedQuery<Extra> query = em.createQuery("from Extra e order by e.price", Extra.class);
		try {
			return query.getResultList();
		} catch (Exception e) {
			return new ArrayList<Extra>();
		}
	}

	@Override
	public Extra findByExtraType(ExtraType extraType) {
		return em.find(Extra.class, extraType);
	}

	@Override
	public Extra save(Extra extra) {
		em.persist(extra);
		return extra;
	}

}
