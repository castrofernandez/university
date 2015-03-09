package com.danimeana.eiibus.presentation.reserve.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.danimeana.eiibus.model.ReserveType;
import com.danimeana.eiibus.presentation.reserve.dto.ReserveDTO;

public class SchedulesValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return ReserveDTO.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ReserveDTO reserveDTO = (ReserveDTO) target;
		if (reserveDTO.getDepartureSchedule() == null || reserveDTO.getDepartureSchedule() == 0) {
			errors.rejectValue("departureSchedule", "errors.schedule.departure.required");
		}
		if (reserveDTO.getType() == ReserveType.RETURN) {
			if (reserveDTO.getReturnSchedule() == null || reserveDTO.getReturnSchedule() == 0) {
				errors.rejectValue("returnSchedule", "errors.schedule.return.required");
			}
		}
	}
}
