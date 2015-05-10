package com.danimeana.eiibus.persistence.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.StartSurvey;
import com.danimeana.eiibus.persistence.StartSurveyDataService;

@Repository
public class StartSurveyDAO implements StartSurveyDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public void add(StartSurvey survey) {
		em.persist(survey);
	}
}
