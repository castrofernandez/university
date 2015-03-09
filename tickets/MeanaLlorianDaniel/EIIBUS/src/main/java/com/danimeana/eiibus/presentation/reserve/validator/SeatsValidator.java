package com.danimeana.eiibus.presentation.reserve.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.danimeana.eiibus.model.ReserveType;
import com.danimeana.eiibus.presentation.reserve.dto.ReserveDTO;

public class SeatsValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return ReserveDTO.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ReserveDTO reserveDTO = (ReserveDTO) target;
		if (reserveDTO.getDepartureSeats() == null
				|| reserveDTO.getDepartureSeats().size() != reserveDTO.getPassengers()) {
			errors.rejectValue("departureSeats", "errors.departure.seats");
		}
		if (reserveDTO.getType() == ReserveType.RETURN) {
			if (reserveDTO.getReturnSeats() == null || reserveDTO.getReturnSeats().size() != reserveDTO.getPassengers()) {
				errors.rejectValue("returnSeats", "errors.return.seats");
			}
		}
	}
}
