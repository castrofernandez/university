package com.danimeana.eiibus.presentation.survey.dto;

import com.danimeana.eiibus.model.Survey;
import com.danimeana.eiibus.model.User;

public class SurveyDTO {
	private String email;
	private String answer1;
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getAnswer1() {
		return answer1;
	}
	
	public void setAnswer1(String answer1) {
		this.answer1 = answer1;
	}
	
	public Survey createSurvey() {
		Survey survey = new Survey();
		
		survey.setEmail(email);
		survey.setAnswer1(answer1);
		
		return survey;
	}
	
	public static SurveyDTO createSurveyDTO(User user) {
		SurveyDTO surveyDTO = new SurveyDTO();
	System.out.println(user);	
		surveyDTO.setEmail(user.getEmail());

		return surveyDTO;
	}
	
	@Override
	public String toString() {
		return "SurveyDTO [email=" + email + ", answer1=" + answer1 + "]";
	}
}
