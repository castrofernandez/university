package com.danimeana.eiibus.business;

import java.util.List;

import com.danimeana.eiibus.model.City;

public interface CityManagerService {

	public List<City> getCities();

	public City getCityById(int id);
	
	public City saveCity(City city);
}
