package com.danimeana.eiibus.presentation.survey.dto;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.danimeana.eiibus.business.UserManagerService;
import com.danimeana.eiibus.model.Survey;
import com.danimeana.eiibus.model.User;

public class SurveyDTO {
	private String email;
	private String answer1;
	private String answer2;
	private String answer3;
	private String answer4;
	private String answer5;
	private String answer6;
	private String answer7;
	private String answer8;
	private String answer9;
	private String answer10;
	private String answer11;
	private String answer12;
	private String answer13;
	private String answer14;
	private String answer15;
	private String answer16;
	private String answer17;
	private String answer18;
	private String answer19;
	private String answer20;
	private String answer21;
	private String answer22;
	private String answer23;
	private String answer24;
	private String answer25;
	private String answer26;
	private String answer27;
	
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

	public String getAnswer8() {
		return answer8;
	}

	public void setAnswer8(String answer8) {
		this.answer8 = answer8;
	}

	public String getAnswer9() {
		return answer9;
	}

	public void setAnswer9(String answer9) {
		this.answer9 = answer9;
	}

	public String getAnswer10() {
		return answer10;
	}

	public void setAnswer10(String answer10) {
		this.answer10 = answer10;
	}

	public String getAnswer11() {
		return answer11;
	}

	public void setAnswer11(String answer11) {
		this.answer11 = answer11;
	}

	public String getAnswer12() {
		return answer12;
	}

	public void setAnswer12(String answer12) {
		this.answer12 = answer12;
	}

	public String getAnswer13() {
		return answer13;
	}

	public void setAnswer13(String answer13) {
		this.answer13 = answer13;
	}

	public String getAnswer14() {
		return answer14;
	}

	public void setAnswer14(String answer14) {
		this.answer14 = answer14;
	}

	public String getAnswer15() {
		return answer15;
	}

	public void setAnswer15(String answer15) {
		this.answer15 = answer15;
	}

	public String getAnswer16() {
		return answer16;
	}

	public void setAnswer16(String answer16) {
		this.answer16 = answer16;
	}

	public String getAnswer17() {
		return answer17;
	}

	public void setAnswer17(String answer17) {
		this.answer17 = answer17;
	}

	public String getAnswer18() {
		return answer18;
	}

	public void setAnswer18(String answer18) {
		this.answer18 = answer18;
	}

	public String getAnswer19() {
		return answer19;
	}

	public void setAnswer19(String answer19) {
		this.answer19 = answer19;
	}

	public String getAnswer20() {
		return answer20;
	}

	public void setAnswer20(String answer20) {
		this.answer20 = answer20;
	}

	public String getAnswer21() {
		return answer21;
	}

	public void setAnswer21(String answer21) {
		this.answer21 = answer21;
	}

	public String getAnswer22() {
		return answer22;
	}

	public void setAnswer22(String answer22) {
		this.answer22 = answer22;
	}

	public String getAnswer23() {
		return answer23;
	}

	public void setAnswer23(String answer23) {
		this.answer23 = answer23;
	}

	public String getAnswer24() {
		return answer24;
	}

	public void setAnswer24(String answer24) {
		this.answer24 = answer24;
	}

	public String getAnswer25() {
		return answer25;
	}

	public void setAnswer25(String answer25) {
		this.answer25 = answer25;
	}

	public String getAnswer26() {
		return answer26;
	}

	public void setAnswer26(String answer26) {
		this.answer26 = answer26;
	}

	public String getAnswer27() {
		return answer27;
	}

	public void setAnswer27(String answer27) {
		this.answer27 = answer27;
	}

	public UserManagerService getUserManagerService() {
		return userManagerService;
	}

	public void setUserManagerService(UserManagerService userManagerService) {
		this.userManagerService = userManagerService;
	}

	@Autowired
	private UserManagerService userManagerService;
	
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
	
	public Survey createSurvey(HttpSession session) {
		Survey survey = new Survey();
		
		String email = loadUserData(session);
		
		survey.setEmail(email);
		survey.setAnswer1(answer1);
		survey.setAnswer2(answer2);
		survey.setAnswer3(answer3);
		survey.setAnswer4(answer4);
		survey.setAnswer5(answer5);
		survey.setAnswer6(answer6);
		survey.setAnswer7(answer7);
		survey.setAnswer8(answer8);
		survey.setAnswer9(answer9);
		survey.setAnswer10(answer10);
		survey.setAnswer11(answer11);
		survey.setAnswer12(answer12);
		survey.setAnswer13(answer13);
		survey.setAnswer14(answer14);
		survey.setAnswer15(answer15);
		survey.setAnswer16(answer16);
		survey.setAnswer17(answer17);
		survey.setAnswer18(answer18);
		survey.setAnswer19(answer19);
		survey.setAnswer20(answer20);
		survey.setAnswer21(answer21);
		survey.setAnswer22(answer22);
		survey.setAnswer23(answer23);
		survey.setAnswer24(answer24);
		survey.setAnswer25(answer25);
		survey.setAnswer26(answer26);
		survey.setAnswer27(answer27);
		
		return survey;
	}
	
	private String loadUserData(HttpSession session) {
		Object inSession = session.getAttribute("userEmail");
		String userEmail = inSession == null ? "" : (String) inSession;

		return userEmail;
	}
	
	public static SurveyDTO createSurveyDTO(User user) {
		SurveyDTO surveyDTO = new SurveyDTO();
	
		surveyDTO.setEmail(user.getEmail());

		return surveyDTO;
	}
	
	@Override
	public String toString() {
		return "SurveyDTO [email=" + email + ", answer1=" + answer1 + "]";
	}
}
