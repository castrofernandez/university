package com.danimeana.eiibus.presentation.reserve.dto;

import java.util.Set;

import com.danimeana.eiibus.model.ExtraType;
import com.danimeana.eiibus.model.ReserveType;

public class ReserveDTO {

	private Integer origin;
	private String departureDate;
	private Integer departureSchedule;
	private Set<Integer> departureSeats;
	private ReserveType type;
	private Integer destination;
	private String returnDate;
	private Integer returnSchedule;
	private Set<Integer> returnSeats;
	private Integer passengers;
	private Set<ExtraType> extras;

	public Integer getOrigin() {
		return origin;
	}

	public void setOrigin(Integer origin) {
		this.origin = origin;
	}

	public String getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}

	public ReserveType getType() {
		return type;
	}

	public void setType(ReserveType type) {
		this.type = type;
	}

	public Integer getDestination() {
		return destination;
	}

	public void setDestination(Integer destination) {
		this.destination = destination;
	}

	public String getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	public Integer getPassengers() {
		return passengers;
	}

	public void setPassengers(Integer passengers) {
		this.passengers = passengers;
	}

	public Integer getDepartureSchedule() {
		return departureSchedule;
	}

	public void setDepartureSchedule(Integer departureSchedule) {
		this.departureSchedule = departureSchedule;
	}

	public Integer getReturnSchedule() {
		return returnSchedule;
	}

	public void setReturnSchedule(Integer returnSchedule) {
		this.returnSchedule = returnSchedule;
	}

	public Set<Integer> getDepartureSeats() {
		return departureSeats;
	}

	public void setDepartureSeats(Set<Integer> departureSeats) {
		this.departureSeats = departureSeats;
	}

	public Set<Integer> getReturnSeats() {
		return returnSeats;
	}

	public void setReturnSeats(Set<Integer> returnSeats) {
		this.returnSeats = returnSeats;
	}

	public Set<ExtraType> getExtras() {
		return extras;
	}

	public void setExtras(Set<ExtraType> extras) {
		this.extras = extras;
	}

	@Override
	public String toString() {
		return "ReserveDTO [origin=" + origin + ", departureDate=" + departureDate + ", departureSchedule="
				+ departureSchedule + ", departureSeats=" + departureSeats + ", type=" + type + ", destination="
				+ destination + ", returnDate=" + returnDate + ", returnSchedule=" + returnSchedule + ", returnSeats="
				+ returnSeats + ", passengers=" + passengers + ", extras=" + extras + "]";
	}
}
