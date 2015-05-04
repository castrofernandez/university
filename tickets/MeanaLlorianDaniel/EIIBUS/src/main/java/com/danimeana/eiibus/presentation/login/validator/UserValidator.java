package com.danimeana.eiibus.presentation.login.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.danimeana.eiibus.model.DocumentType;
import com.danimeana.eiibus.presentation.login.dto.UserDTO;

public class UserValidator implements Validator {

	private static final String TABLE_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";
	private static final String EMAIL_PATTERN = "[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})";
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
		if (userDTO.getAge() == 0)
			errors.rejectValue("age", "errors.age.required");
		if (userDTO.getGender() == null || userDTO.getGender().isEmpty())
			errors.rejectValue("gender", "errors.gender.required");
		if (userDTO.getLaterality() == null || userDTO.getLaterality().isEmpty())
			errors.rejectValue("laterality", "errors.laterality.required");
		else {
			DocumentType documentType = userDTO.getDocumentType();
			boolean correct = false;
			if (documentType == DocumentType.DNI) {
				/*correct = userDTO.getDocumentNumber().toUpperCase().matches(DNI_PATTERN);
				if (correct) {
					int dniNumber = Integer.parseInt(userDTO.getDocumentNumber().substring(0, 8));
					char letter = userDTO.getDocumentNumber().charAt(8);
					correct = TABLE_LETTERS.charAt(dniNumber % 23) == letter;
				}*/
				correct = true;
			} else if (documentType == DocumentType.NIE)
				correct = true;
				//correct = userDTO.getDocumentNumber().toUpperCase().matches(NIE_PATTERN);
			else if (documentType == DocumentType.PASSPORT) {
				correct = true;
			} else
				correct = false;
			if (!correct)
				errors.rejectValue("documentNumber", "errors.document.number.not.correct");
		}
		if (userDTO.getEmail() == null || userDTO.getEmail().isEmpty())
			errors.rejectValue("email", "errors.email.required");
		else if (!userDTO.getEmail().matches(EMAIL_PATTERN))
			errors.rejectValue("email", "errors.email.requirements");
		if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty())
			errors.rejectValue("password", "errors.password.required");
		else {
			String password = userDTO.getPassword();
			if (!password.equals(userDTO.getConfirmPassword()))
				errors.rejectValue("confirmPassword", "errors.password.not.match");
			if (!password.matches("[0-9a-zA-Z]*") || password.length() < 6 || password.length() > 16
					|| password.split(" ").length > 1)
				errors.rejectValue("password", "errors.password.requirements");
		}
	}
}
