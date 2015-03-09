package com.danimeana.eiibus.persistence;

import java.util.List;

import com.danimeana.eiibus.model.City;

public interface CityDataService {

	public List<City> findAll();

	public City findById(int id);

	public City save(City city);
}
