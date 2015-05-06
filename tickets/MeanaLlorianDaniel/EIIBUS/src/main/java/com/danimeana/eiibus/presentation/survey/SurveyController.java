package com.danimeana.eiibus.presentation.survey;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.danimeana.eiibus.business.SurveyManagerService;
import com.danimeana.eiibus.presentation.survey.dto.SurveyDTO;

/**
 * Handles requests for the application home page.
 */
@Controller
public class SurveyController {

	@Autowired
	private SurveyManagerService surveyManagerService;

	@RequestMapping(value = "survey")
	public String index(@ModelAttribute("SurveyDTO") SurveyDTO surveyDTO, Model model) {
		return "survey";
	}

	@RequestMapping(value = "save_survey", method = RequestMethod.POST)
	public String register(@Valid @ModelAttribute("SurveyDTO") SurveyDTO surveyDTO, BindingResult result, Model model,
			HttpSession session) {

		surveyManagerService.addSurvey(surveyDTO.createSurvey(session));
	
		return "redirect:index";
	}
}
