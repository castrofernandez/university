package com.danimeana.eiibus.persistence.impl;

import java.sql.Timestamp;

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
		java.util.Date date = new java.util.Date();
		survey.setTime(new Timestamp(date.getTime()));
		
		em.persist(survey);
	}
}
