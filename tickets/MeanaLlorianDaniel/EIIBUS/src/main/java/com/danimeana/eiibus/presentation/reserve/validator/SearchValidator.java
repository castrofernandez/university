package com.danimeana.eiibus.presentation.reserve.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.danimeana.eiibus.infrastructure.DateTimeUtil;
import com.danimeana.eiibus.model.ReserveType;
import com.danimeana.eiibus.presentation.reserve.dto.ReserveDTO;

public class SearchValidator implements Validator {

	private static final String DATE_PATTERN = "\\d{1,2}/\\d{1,2}/\\d{4}";

	@Override
	public boolean supports(Class<?> clazz) {
		return ReserveDTO.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ReserveDTO reserveDTO = (ReserveDTO) target;
		if (reserveDTO.getOrigin() == null || reserveDTO.getOrigin() == 0) {
			errors.rejectValue("origin", "errors.origin.required");
		}
		if (reserveDTO.getDepartureDate() == null || reserveDTO.getDepartureDate().isEmpty()) {
			errors.rejectValue("departureDate", "errors.departure.date.required");
		} else if (!reserveDTO.getDepartureDate().matches(DATE_PATTERN)) {
			errors.rejectValue("departureDate", "errors.date.format.incorrect");
		} else if (DateTimeUtil.getDateFromString(reserveDTO.getDepartureDate()).getTime()
				- DateTimeUtil.today().getTime() < 0)
			errors.rejectValue("departureDate", "errors.date.value.incorrect");
		if (reserveDTO.getPassengers() == null) {
			errors.rejectValue("passengers", "errors.pessengers.required");
		} else if (reserveDTO.getPassengers() <= 0) {
			errors.rejectValue("passengers", "errors.pessengers.minimun");
		}
		if (reserveDTO.getType() == null) {
			errors.rejectValue("type", "errors.reserve.type.required");
		} else if (reserveDTO.getType() != ReserveType.ONEWAY) {
			if (reserveDTO.getDestination() == null || reserveDTO.getDestination() == 0) {
				errors.rejectValue("destination", "errors.destination.required");
			}
			if (reserveDTO.getType() == ReserveType.RETURN) {
				if (reserveDTO.getReturnDate() == null || reserveDTO.getReturnDate().isEmpty()) {
					errors.rejectValue("returnDate", "errors.return.date.required");
				} else if (!reserveDTO.getReturnDate().matches(DATE_PATTERN)) {
					errors.rejectValue("returnDate", "errors.date.format.ncorrect");
				} else if (DateTimeUtil.getDateFromString(reserveDTO.getReturnDate()).getTime()
						- DateTimeUtil.getDateFromString(reserveDTO.getDepartureDate()).getTime() < 0) {
					errors.rejectValue("returnDate", "errors.date.value.incorrect");
				}
			}

		}
	}
}
