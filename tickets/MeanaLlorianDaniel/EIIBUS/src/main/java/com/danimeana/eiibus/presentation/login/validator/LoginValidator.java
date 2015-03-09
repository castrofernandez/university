package com.danimeana.eiibus.presentation.login.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.danimeana.eiibus.presentation.login.dto.LoginDTO;

public class LoginValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return LoginDTO.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		LoginDTO loginDTO = (LoginDTO) target;
		if (loginDTO.getEmail() == null || loginDTO.getEmail().isEmpty())
			errors.rejectValue("email", "errors.email.required");
		if (loginDTO.getPassword() == null || loginDTO.getPassword().isEmpty())
			errors.rejectValue("password", "errors.password.required");
	}

}
