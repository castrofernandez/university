package com.danimeana.eiibus.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Entity
public class Extra {

	@Id
	@Enumerated(EnumType.STRING)
	private ExtraType type;
	private double price;

	public Extra() {
	}

	public Extra(ExtraType type, double price) {
		this.type = type;
		this.price = price;
	}

	public ExtraType getType() {
		return type;
	}

	public void setType(ExtraType type) {
		this.type = type;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Extra [type=" + type + ", price=" + price + "]";
	}

}
