package com.danimeana.eiibus.business.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.CityManagerService;
import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.persistence.CityDataService;

@Service
@Transactional
public class CityManagerServiceImpl implements CityManagerService {

	@Autowired
	private CityDataService cityDataService;

	@Override
	public List<City> getCities() {
		return cityDataService.findAll();
	}

	@Override
	public City getCityById(int id) {
		return cityDataService.findById(id);
	}

	@Override
	public City saveCity(City city) {
		return cityDataService.save(city);
	}

}
