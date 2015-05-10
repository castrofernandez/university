package com.danimeana.eiibus.presentation.dto;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.danimeana.eiibus.business.UserManagerService;
import com.danimeana.eiibus.model.StartSurvey;
import com.danimeana.eiibus.model.User;

public class StartSurveyDTO {
	private String email;
	private String answer1;
	private String answer2;
	private String answer3;
	private String answer4;
	private String answer5;
	private String answer6;
	private String answer7;

	public UserManagerService getUserManagerService() {
		return userManagerService;
	}

	public void setUserManagerService(UserManagerService userManagerService) {
		this.userManagerService = userManagerService;
	}

	@Autowired
	private UserManagerService userManagerService;
	
	public StartSurvey createSurvey(HttpSession session) {
		StartSurvey survey = new StartSurvey();
		
		String email = loadUserData(session);
		
		survey.setEmail(email);
		survey.setSession(session.getId());
		survey.setAnswer1(answer1);
		survey.setAnswer2(answer2);
		survey.setAnswer3(answer3);
		survey.setAnswer4(answer4);
		survey.setAnswer5(answer5);
		survey.setAnswer6(answer6);
		survey.setAnswer7(answer7);
		
		return survey;
	}
	
	private String loadUserData(HttpSession session) {
		Object inSession = session.getAttribute("userEmail");
		String userEmail = inSession == null ? "" : (String) inSession;

		return userEmail;
	}
	
	public static StartSurveyDTO createSurveyDTO(User user) {
		StartSurveyDTO surveyDTO = new StartSurveyDTO();
	
		surveyDTO.setEmail(user.getEmail());

		return surveyDTO;
	}

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

	public String getAnswer2() {
		return answer2;
	}

	public void setAnswer2(String answer2) {
		this.answer2 = answer2;
	}

	public String getAnswer3() {
		return answer3;
	}

	public void setAnswer3(String answer3) {
		this.answer3 = answer3;
	}

	public String getAnswer4() {
		return answer4;
	}

	public void setAnswer4(String answer4) {
		this.answer4 = answer4;
	}

	public String getAnswer5() {
		return answer5;
	}

	public void setAnswer5(String answer5) {
		this.answer5 = answer5;
	}

	public String getAnswer6() {
		return answer6;
	}

	public void setAnswer6(String answer6) {
		this.answer6 = answer6;
	}

	public String getAnswer7() {
		return answer7;
	}

	public void setAnswer7(String answer7) {
		this.answer7 = answer7;
	}

	@Override
	public String toString() {
		return "StartSurveyDTO [email=" + email + ", answer1=" + answer1
				+ ", answer2=" + answer2 + ", answer3=" + answer3
				+ ", answer4=" + answer4 + ", answer5=" + answer5
				+ ", answer6=" + answer6 + ", answer7=" + answer7
				+ ", userManagerService=" + userManagerService + "]";
	}
}
