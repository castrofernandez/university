package com.danimeana.eiibus.business.impl;

import javax.transaction.Transactional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.SurveyManagerService;
import com.danimeana.eiibus.model.Survey;
import com.danimeana.eiibus.persistence.SurveyDataService;

@Service
@Transactional
public class SurveyManagerServiceImpl implements SurveyManagerService {

	@Autowired
	private SurveyDataService surveyDataService;

	@Override
	public void addSurvey(Survey survey) {
		survey.setId(RandomStringUtils.randomAlphanumeric(8)); System.out.println(survey);
		surveyDataService.add(survey);
	}
}
