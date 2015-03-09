package com.danimeana.eiibus.business;

import java.util.List;

import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.model.Trip;

public interface TripManagerService {

	public List<Trip> getTripsByOrigin(City origin);

	public Trip getTripByOriginAndDestination(City origin, City destination);
	
	public List<City> getDestinationsByOriginId(int id);

	public Trip saveTrip(Trip trip);

}
