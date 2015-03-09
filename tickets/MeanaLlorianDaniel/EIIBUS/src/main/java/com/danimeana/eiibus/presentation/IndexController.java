package com.danimeana.eiibus.presentation;

import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

	@RequestMapping(value = "index", method = RequestMethod.GET)
	public String index(Locale locale, HttpSession session) {
		session.removeAttribute("ReserveDTO");
		return "index";
	}

}
