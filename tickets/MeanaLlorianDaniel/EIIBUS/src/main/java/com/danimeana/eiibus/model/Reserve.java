package com.danimeana.eiibus.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Reserve {

	@Id
	private String id;
	@Temporal(TemporalType.DATE)
	private Date departureDate;
	@Temporal(TemporalType.DATE)
	private Date returnDate;
	@ManyToOne
	private Schedule departureSchedule;
	@ManyToOne
	private Schedule returnSchedule;
	@ElementCollection(fetch = FetchType.EAGER)
	private Set<Integer> departureSeats;
	@ElementCollection(fetch = FetchType.EAGER)
	private Set<Integer> returnSeats;
	@ManyToOne
	private User user;
	@Enumerated(EnumType.STRING)
	private ReserveType type;
	@ManyToMany(fetch = FetchType.EAGER)
	private Set<Extra> extras;

	public Reserve() {
	}

	public Reserve(Date departureDate, Date returnDate, Schedule departureSchedule, Schedule returnSchedule,
			Set<Integer> departureSeats, Set<Integer> returnSeats, User user, ReserveType type, Set<Extra> extras) {
		this.departureDate = departureDate;
		this.returnDate = returnDate;
		this.departureSchedule = departureSchedule;
		this.returnSchedule = returnSchedule;
		this.departureSeats = departureSeats;
		this.returnSeats = returnSeats;
		this.user = user;
		this.type = type;
		this.extras = extras;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(Date departureDate) {
		this.departureDate = departureDate;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}

	public Schedule getDepartureSchedule() {
		return departureSchedule;
	}

	public void setDepartureSchedule(Schedule departureSchedule) {
		this.departureSchedule = departureSchedule;
	}

	public Schedule getReturnSchedule() {
		return returnSchedule;
	}

	public void setReturnSchedule(Schedule returnSchedule) {
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ReserveType getType() {
		return type;
	}

	public void setType(ReserveType type) {
		this.type = type;
	}

	public Set<Extra> getExtras() {
		return extras;
	}

	public void setExtras(Set<Extra> extras) {
		this.extras = extras;
	}

	@Override
	public String toString() {
		return "Reserve [id=" + id + ", departureDate=" + departureDate + ", returnDate=" + returnDate
				+ ", departureSchedule=" + departureSchedule + ", returnSchedule=" + returnSchedule
				+ ", departureSeats=" + departureSeats + ", returnSeats=" + returnSeats + ", user=" + user + ", type="
				+ type + ", extras=" + extras + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((departureDate == null) ? 0 : departureDate.hashCode());
		result = prime * result + ((departureSchedule == null) ? 0 : departureSchedule.hashCode());
		result = prime * result + ((departureSeats == null) ? 0 : departureSeats.hashCode());
		result = prime * result + ((extras == null) ? 0 : extras.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((returnDate == null) ? 0 : returnDate.hashCode());
		result = prime * result + ((returnSchedule == null) ? 0 : returnSchedule.hashCode());
		result = prime * result + ((returnSeats == null) ? 0 : returnSeats.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
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
		Reserve other = (Reserve) obj;
		if (departureDate == null) {
			if (other.departureDate != null)
				return false;
		} else if (!departureDate.equals(other.departureDate))
			return false;
		if (departureSchedule == null) {
			if (other.departureSchedule != null)
				return false;
		} else if (!departureSchedule.equals(other.departureSchedule))
			return false;
		if (departureSeats == null) {
			if (other.departureSeats != null)
				return false;
		} else if (!departureSeats.equals(other.departureSeats))
			return false;
		if (extras == null) {
			if (other.extras != null)
				return false;
		} else if (!extras.equals(other.extras))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (returnDate == null) {
			if (other.returnDate != null)
				return false;
		} else if (!returnDate.equals(other.returnDate))
			return false;
		if (returnSchedule == null) {
			if (other.returnSchedule != null)
				return false;
		} else if (!returnSchedule.equals(other.returnSchedule))
			return false;
		if (returnSeats == null) {
			if (other.returnSeats != null)
				return false;
		} else if (!returnSeats.equals(other.returnSeats))
			return false;
		if (type != other.type)
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

}
