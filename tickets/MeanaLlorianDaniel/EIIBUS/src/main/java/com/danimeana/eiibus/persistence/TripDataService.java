package com.danimeana.eiibus.persistence;

import java.util.List;

import com.danimeana.eiibus.model.City;
import com.danimeana.eiibus.model.Trip;

public interface TripDataService {

	public List<Trip> findByOrigin(City origin);

	public Trip findByOriginAndDestination(City origin, City destination);

	public Trip save(Trip trip);

}
