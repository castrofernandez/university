package com.danimeana.eiibus.business.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.CityManagerService;
import com.danimeana.eiibus.business.TripManagerService;
import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.model.Trip;
import com.danimeana.eiibus.persistence.TripDataService;

@Service
@Transactional
public class TripManagerServiceImpl implements TripManagerService {

	@Autowired
	private TripDataService tripDataService;

	@Autowired
	private CityManagerService cityManagerService;

	@Override
	public List<Trip> getTripsByOrigin(City origin) {
		return tripDataService.findByOrigin(origin);
	}

	@Override
	public Trip getTripByOriginAndDestination(City origin, City destination) {
		return tripDataService.findByOriginAndDestination(origin, destination);
	}

	@Override
	public Trip saveTrip(Trip trip) {
		return tripDataService.save(trip);
	}

	@Override
	public List<City> getDestinationsByOriginId(int id) {
		City origin = cityManagerService.getCityById(id);
		List<Trip> trips = getTripsByOrigin(origin);
		List<City> destinations = new ArrayList<City>();
		for (Trip trip : trips) {
			destinations.add(trip.getDestination());
		}
		return destinations;
	}

}
