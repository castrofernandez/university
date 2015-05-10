package com.danimeana.eiibus.business.impl;

import javax.transaction.Transactional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.StartSurveyManagerService;
import com.danimeana.eiibus.model.StartSurvey;
import com.danimeana.eiibus.persistence.StartSurveyDataService;

@Service
@Transactional
public class StartSurveyManagerServiceImpl implements StartSurveyManagerService {

	@Autowired
	private StartSurveyDataService surveyDataService;

	@Override
	public void addSurvey(StartSurvey survey) {
		survey.setId(RandomStringUtils.randomAlphanumeric(8));
		surveyDataService.add(survey);
	}
}
