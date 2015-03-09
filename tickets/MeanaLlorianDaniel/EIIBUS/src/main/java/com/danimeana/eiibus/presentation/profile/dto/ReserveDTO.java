package com.danimeana.eiibus.presentation.profile.dto;

import java.util.Set;

import com.danimeana.eiibus.infrastructure.DateTimeUtil;
import com.danimeana.eiibus.model.Reserve;
import com.danimeana.eiibus.model.ReserveType;

public class ReserveDTO {

	public static ReserveDTO getReserveDTO(Reserve reserve) {
		ReserveDTO reserveDTO = new ReserveDTO();

		reserveDTO.setId(reserve.getId());

		reserveDTO.setOrigin(reserve.getDepartureSchedule().getTrip().getOrigin().getName());
		reserveDTO.setDepartureDate(DateTimeUtil.getStringFromDate(reserve.getDepartureDate()));
		reserveDTO.setOutboundDeparture(reserve.getDepartureSchedule().getDeparture());
		reserveDTO.setOutboundArrival(DateTimeUtil.timePlusMinutesStr(reserve.getDepartureSchedule().getDeparture(),
				reserve.getDepartureSchedule().getDuration()));
		reserveDTO.setDepartureSeats(reserve.getDepartureSeats());
		reserveDTO.setPricePerDepartureSeat(reserve.getDepartureSchedule().getPrice());

		reserveDTO.setDestination(reserve.getDepartureSchedule().getTrip().getDestination().getName());
		ReserveType type = reserve.getType();
		reserveDTO.setType(type);
		if (type == ReserveType.RETURN) {
			reserveDTO.setReturnDate(DateTimeUtil.getStringFromDate(reserve.getReturnDate()));
			reserveDTO.setInboundDeparture(reserve.getReturnSchedule().getDeparture());
			reserveDTO.setInboundArrival(DateTimeUtil.timePlusMinutesStr(reserve.getReturnSchedule().getDeparture(),
					reserve.getReturnSchedule().getDuration()));
			reserveDTO.setReturnSeats(reserve.getReturnSeats());
			reserveDTO.setPricePerReturnSeat(reserve.getReturnSchedule().getPrice());
		}
		if (DateTimeUtil.getDateFromString(reserveDTO.getDepartureDate()).before(DateTimeUtil.today()))
			reserveDTO.setOld(true);
		else
			reserveDTO.setOld(false);
		return reserveDTO;
	}

	private String id;
	private UserDTO user;
	private String origin;
	private String departureDate;
	private String outboundDeparture;
	private String outboundArrival;
	private Set<Integer> departureSeats;
	private double pricePerDepartureSeat;
	private ReserveType type;
	private String destination;
	private String returnDate;
	private String inboundDeparture;
	private String inboundArrival;
	private Set<Integer> returnSeats;
	private double pricePerReturnSeat;
	private boolean old;

	public boolean isOld() {
		return old;
	}

	public void setOld(boolean old) {
		this.old = old;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}

	public String getOutboundDeparture() {
		return outboundDeparture;
	}

	public void setOutboundDeparture(String outboundDeparture) {
		this.outboundDeparture = outboundDeparture;
	}

	public String getOutboundArrival() {
		return outboundArrival;
	}

	public void setOutboundArrival(String outboundArrival) {
		this.outboundArrival = outboundArrival;
	}

	public Set<Integer> getDepartureSeats() {
		return departureSeats;
	}

	public void setDepartureSeats(Set<Integer> departureSeats) {
		this.departureSeats = departureSeats;
	}

	public double getPricePerDepartureSeat() {
		return pricePerDepartureSeat;
	}

	public void setPricePerDepartureSeat(double pricePerDepartureSeat) {
		this.pricePerDepartureSeat = pricePerDepartureSeat;
	}

	public ReserveType getType() {
		return type;
	}

	public void setType(ReserveType type) {
		this.type = type;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	public String getInboundDeparture() {
		return inboundDeparture;
	}

	public void setInboundDeparture(String inboundDeparture) {
		this.inboundDeparture = inboundDeparture;
	}

	public String getInboundArrival() {
		return inboundArrival;
	}

	public void setInboundArrival(String inboundArrival) {
		this.inboundArrival = inboundArrival;
	}

	public Set<Integer> getReturnSeats() {
		return returnSeats;
	}

	public void setReturnSeats(Set<Integer> returnSeats) {
		this.returnSeats = returnSeats;
	}

	public double getPricePerReturnSeat() {
		return pricePerReturnSeat;
	}

	public void setPricePerReturnSeat(double pricePerReturnSeat) {
		this.pricePerReturnSeat = pricePerReturnSeat;
	}

	@Override
	public String toString() {
		return "ReserveDTO [id=" + id + ", user=" + user + ", origin=" + origin + ", departureDate=" + departureDate
				+ ", outboundDeparture=" + outboundDeparture + ", outboundArrival=" + outboundArrival
				+ ", departureSeats=" + departureSeats + ", pricePerDepartureSeat=" + pricePerDepartureSeat + ", type="
				+ type + ", destination=" + destination + ", returnDate=" + returnDate + ", inboundDeparture="
				+ inboundDeparture + ", inboundArrival=" + inboundArrival + ", returnSeats=" + returnSeats
				+ ", pricePerReturnSeat=" + pricePerReturnSeat + ", old=" + old + "]";
	}

}
