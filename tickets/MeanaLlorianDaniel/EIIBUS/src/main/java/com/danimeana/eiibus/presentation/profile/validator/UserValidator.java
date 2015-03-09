package com.danimeana.eiibus.presentation.profile.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.danimeana.eiibus.model.DocumentType;
import com.danimeana.eiibus.presentation.profile.dto.UserDTO;

public class UserValidator implements Validator {

	private static final String TABLE_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";
	private static final String DNI_PATTERN = "\\d{8}[A-Z]";
	private static final String NIE_PATTERN = "[XYZ]\\d{7,8}";


	@Override
	public boolean supports(Class<?> clazz) {
		return UserDTO.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		UserDTO userDTO = (UserDTO) target;
		if (userDTO.getName() == null || userDTO.getName().isEmpty())
			errors.rejectValue("name", "errors.name.required");
		if (userDTO.getLastname() == null || userDTO.getLastname().isEmpty())
			errors.rejectValue("lastname", "errors.lastname.required");
		if (userDTO.getDocumentNumber() == null || userDTO.getDocumentNumber().isEmpty())
			errors.rejectValue("documentNumber", "errors.document.number.required");
		else {
			DocumentType documentType = userDTO.getDocumentType();
			boolean correct = false;
			if (documentType == DocumentType.DNI) {
				correct = userDTO.getDocumentNumber().toUpperCase().matches(DNI_PATTERN);
				if (correct) {
					int dniNumber = Integer.parseInt(userDTO.getDocumentNumber().substring(0, 8));
					char letter = userDTO.getDocumentNumber().charAt(8);
					correct = TABLE_LETTERS.charAt(dniNumber % 23) == letter;
				}
			} else if (documentType == DocumentType.NIE)
				correct = userDTO.getDocumentNumber().toUpperCase().matches(NIE_PATTERN);
			else if (documentType == DocumentType.PASSPORT) {
				correct = true;
			} else
				correct = false;
			if (!correct)
				errors.rejectValue("documentNumber", "errors.document.number.not.correct");
		}
		if (userDTO.getOldPassword() == null || userDTO.getOldPassword().isEmpty())
			errors.rejectValue("oldPassword", "errors.password.required");
		if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
			String password = userDTO.getPassword();
			if (!password.equals(userDTO.getConfirmPassword()))
				errors.rejectValue("confirmPassword", "errors.password.not.match");
			if (!password.matches("[0-9a-zA-Z]*") || password.length() < 6 || password.length() > 16
					|| password.split(" ").length > 1)
				errors.rejectValue("password", "errors.password.requirements");
		}
	}
}
