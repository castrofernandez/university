package com.danimeana.eiibus.persistence.impl;

import java.sql.Timestamp;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.Survey;
import com.danimeana.eiibus.persistence.SurveyDataService;

@Repository
public class SurveyDAO implements SurveyDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public void add(Survey survey) {
		java.util.Date date = new java.util.Date();
		survey.setTime(new Timestamp(date.getTime()));
		
		em.persist(survey);
	}
}
