package com.danimeana.eiibus.presentation.login;

import java.util.LinkedHashMap;
import java.util.Map;

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
import com.danimeana.eiibus.model.DocumentType;
import com.danimeana.eiibus.model.User;
import com.danimeana.eiibus.presentation.login.dto.LoginDTO;
import com.danimeana.eiibus.presentation.login.dto.UserDTO;
import com.danimeana.eiibus.presentation.login.validator.LoginValidator;
import com.danimeana.eiibus.presentation.login.validator.UserValidator;

/**
 * Handles requests for the application home page.
 */
@Controller
public class LoginController {

	private static final String LOGIN_PAGE = "login";

	@Autowired
	private UserManagerService userManagerService;

	@RequestMapping(value = { "login", "register" }, method = RequestMethod.GET)
	public String index(HttpServletRequest request, Model model) {
		setReferer(request);
		loadData(model);
		return LOGIN_PAGE;
	}

	@RequestMapping(value = "register", method = RequestMethod.POST)
	public String register(@Valid @ModelAttribute("UserDTO") UserDTO userDTO, BindingResult result, Model model,
			HttpSession session) {
		UserValidator validator = new UserValidator();
		validator.validate(userDTO, result);

		if (result.hasErrors()) {
			loadData(model);
			return LOGIN_PAGE;
		}
		User user = userManagerService.getUserByEmail(userDTO.getEmail());
		if (user != null) {
			result.rejectValue("email", "errors.email.exists");
			loadData(model);
			return LOGIN_PAGE;
		}
		userManagerService.addUser(userDTO.createUser());
		// I only save email and name in session to avoid storing a lot of data.
		session.setAttribute("userEmail", userDTO.getEmail());
		session.setAttribute("userName", userDTO.getName());
		return "redirect:" + getReferer(session);
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String login(@Valid @ModelAttribute("LoginDTO") LoginDTO loginDTO, BindingResult result, Model model,
			HttpSession session) {
		LoginValidator validator = new LoginValidator();
		validator.validate(loginDTO, result);

		if (result.hasErrors()) {
			loadData(model);
			return LOGIN_PAGE;
		}
		User user = userManagerService.getUserByEmail(loginDTO.getEmail());
		if (user == null || !user.getPassword().equals(loginDTO.getPassword())) {
			result.rejectValue("email", "errors.login.not.correct");
			loadData(model);
			return LOGIN_PAGE;
		}

		session.setAttribute("userEmail", user.getEmail());
		session.setAttribute("userName", user.getName());
		return "redirect:" + getReferer(session);
	}

	@ModelAttribute("UserDTO")
	public UserDTO getUserDTO() {
		return new UserDTO();
	}

	@ModelAttribute("LoginDTO")
	public LoginDTO getLoginDTO() {
		return new LoginDTO();
	}

	private void loadData(Model model) {
		Map<DocumentType, String> documentTypes = new LinkedHashMap<DocumentType, String>();
		// The value is used to identify the string on the messages (i18e)
		documentTypes.put(DocumentType.DNI, "dni");
		documentTypes.put(DocumentType.NIE, "nie");
		documentTypes.put(DocumentType.PASSPORT, "passport");
		model.addAttribute("documentTypes", documentTypes);
	}

	private void setReferer(HttpServletRequest request) {
		String fullReferer = request.getHeader("referer");
		if (fullReferer != null) {
			String[] splitReferer = fullReferer.split("/");
			String referer = splitReferer[splitReferer.length - 1];
			if (referer != null && !referer.contains(LOGIN_PAGE) && !referer.contains("eiibus"))
				request.getSession().setAttribute("referer", referer);
		}
	}
	
	private String getReferer(HttpSession session) {
		String referer = (String) session.getAttribute("referer");
		if (referer == null)
			referer = "index";
		session.removeAttribute("referer");
		return referer;
	}
}
