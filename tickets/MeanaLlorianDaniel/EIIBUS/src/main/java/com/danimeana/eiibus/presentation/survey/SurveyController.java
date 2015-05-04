package com.danimeana.eiibus.presentation.survey;

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

import com.danimeana.eiibus.business.UserManagerService;
import com.danimeana.eiibus.presentation.login.dto.UserDTO;

/**
 * Handles requests for the application home page.
 */
@Controller
public class SurveyController {

	@Autowired
	private UserManagerService userManagerService;

	@RequestMapping(value = { "login", "register" }, method = RequestMethod.GET)
	public String index(HttpServletRequest request, Model model) {
		return "survey";
	}

	@RequestMapping(value = "save", method = RequestMethod.POST)
	public String register(@Valid @ModelAttribute("UserDTO") UserDTO userDTO, BindingResult result, Model model,
			HttpSession session) {
		userManagerService.addUser(userDTO.createUser());
		return "redirect:index";
	}
}
