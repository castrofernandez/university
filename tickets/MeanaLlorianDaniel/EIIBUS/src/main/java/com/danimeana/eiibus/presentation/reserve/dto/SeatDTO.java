package com.danimeana.eiibus.presentation.reserve.dto;

public class SeatDTO {

	private int id;
	private boolean free;

	public SeatDTO() {
	}

	public SeatDTO(int id, boolean free) {
		this.id = id;
		this.free = free;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isFree() {
		return free;
	}

	public void setFree(boolean free) {
		this.free = free;
	}

	@Override
	public String toString() {
		return "SeatDTO [id=" + id + ", free=" + free + "]";
	}

}
