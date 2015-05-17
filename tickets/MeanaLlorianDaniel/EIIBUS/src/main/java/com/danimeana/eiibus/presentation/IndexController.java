package com.danimeana.eiibus.presentation;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.danimeana.eiibus.business.StartSurveyManagerService;
import com.danimeana.eiibus.presentation.dto.StartSurveyDTO;

@Controller
public class IndexController {
	
	@Autowired
	private StartSurveyManagerService surveyManagerService;
/*
	@RequestMapping(value = "index", method = RequestMethod.GET)
	public String index(Locale locale, HttpSession session) {
		session.removeAttribute("ReserveDTO"); System.out.println("hola");
		return "index";
	}
*/
	@RequestMapping(value = "index", method = RequestMethod.GET)
	public String index(@ModelAttribute("StartSurveyDTO") StartSurveyDTO startSurveyDTO, Model model, HttpSession session, HttpServletRequest request) {
		String code = request.getParameter("code");
		session.setAttribute("code", code);
	
		return "index";
	}

	@RequestMapping(value = "start", method = RequestMethod.POST)
	public String register(@Valid @ModelAttribute("StartSurveyDTO") StartSurveyDTO startSurveyDTO, BindingResult result, Model model,
			HttpSession session) {

		surveyManagerService.addSurvey(startSurveyDTO.createSurvey(session));
		
		session.removeAttribute("ReserveDTO");
		
		return "start";
	}
}
