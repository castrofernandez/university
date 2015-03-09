package com.danimeana.eiibus.persistence;

import java.util.List;

import com.danimeana.eiibus.model.Extra;
import com.danimeana.eiibus.model.ExtraType;

public interface ExtraDataService {

	public List<Extra> findAllOrderByPrice();
	
	public Extra findByExtraType(ExtraType extraType);
	
	public Extra save(Extra extra);
}
