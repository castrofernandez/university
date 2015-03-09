package com.danimeana.eiibus.model;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@ManyToOne
	private Trip trip;
	private String departure;
	private int duration;
	private double price;
	@Enumerated(EnumType.STRING)
	@ElementCollection(targetClass=ScheduleDay.class, fetch=FetchType.EAGER)
	private List<ScheduleDay> days;
	@ManyToOne
	private Bus bus;

	public Schedule() {

	}

	public Schedule(Trip trip, String departure, int duration, double price, List<ScheduleDay> days, Bus bus) {
		this.trip = trip;
		this.departure = departure;
		this.duration = duration;
		this.price = price;
		this.days = days;
		this.bus = bus;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
	}

	public String getDeparture() {
		return departure;
	}

	public void setDeparture(String departure) {
		this.departure = departure;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public List<ScheduleDay> getDays() {
		return days;
	}

	public void setDays(List<ScheduleDay> days) {
		this.days = days;
	}

	public Bus getBus() {
		return bus;
	}

	public void setBus(Bus bus) {
		this.bus = bus;
	}

	@Override
	public String toString() {
		return "Schedule [id=" + id + ", trip=" + trip + ", departure=" + departure + ", duration=" + duration
				+ ", price=" + price + ", days=" + days + ", bus=" + bus + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Schedule other = (Schedule) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
