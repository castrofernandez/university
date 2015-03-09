package com.danimeana.eiibus.presentation.reserve.dto;

import java.util.List;

import com.danimeana.eiibus.model.Schedule;
import com.danimeana.eiibus.model.ScheduleDay;

public class ScheduleDTO {

	public static ScheduleDTO getScheduleDTO(Schedule schedule) {
		ScheduleDTO scheduleDTO = new ScheduleDTO();
		scheduleDTO.setId(schedule.getId());
		scheduleDTO.setOrigin(schedule.getTrip().getOrigin().getName());
		scheduleDTO.setDestination(schedule.getTrip().getDestination().getName());
		String departure = schedule.getDeparture();
		scheduleDTO.setDeparture(departure);
		String[] departureSplit = departure.split(":");
		int hours = Integer.parseInt(departureSplit[0]);
		int minutes = Integer.parseInt(departureSplit[1]);
		int duration = schedule.getDuration();
		minutes += duration;
		if (minutes > 59) {
			hours += minutes / 60;
			minutes = minutes % 60;
		}
		String arrival = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
		scheduleDTO.setArrival(arrival);
		if (duration > 59) {
			hours = duration / 60;
			minutes = duration % 60;
			scheduleDTO.setDuration(hours + "h " + (minutes < 10 ? "0" + minutes : minutes) + "min");
		} else
			scheduleDTO.setDuration((duration < 10 ? "0" + duration : duration) + "min");
		scheduleDTO.setSeats(String.valueOf(schedule.getBus().getSeats()));
		scheduleDTO.setPrice(String.valueOf(schedule.getPrice()));
		scheduleDTO.setDays(schedule.getDays());
		return scheduleDTO;
	}

	private int id;
	private String origin;
	private String destination;
	private String departure;
	private String arrival;
	private String duration;
	private String seats;
	private String price;
	private List<ScheduleDay> days;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getDeparture() {
		return departure;
	}

	public void setDeparture(String departure) {
		this.departure = departure;
	}

	public String getArrival() {
		return arrival;
	}

	public void setArrival(String arrival) {
		this.arrival = arrival;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getSeats() {
		return seats;
	}

	public void setSeats(String seats) {
		this.seats = seats;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public List<ScheduleDay> getDays() {
		return days;
	}

	public void setDays(List<ScheduleDay> days) {
		this.days = days;
	}

	@Override
	public String toString() {
		return "ScheduleDTO [id=" + id + ", origin=" + origin + ", destination=" + destination + ", departure="
				+ departure + ", arrival=" + arrival + ", duration=" + duration + ", seats=" + seats + ", price="
				+ price + ", days=" + days + "]";
	}

}
