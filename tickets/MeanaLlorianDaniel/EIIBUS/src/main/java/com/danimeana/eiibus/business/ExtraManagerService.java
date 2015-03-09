package com.danimeana.eiibus.business;

import java.util.List;

import com.danimeana.eiibus.model.Extra;
import com.danimeana.eiibus.model.ExtraType;

public interface ExtraManagerService {

	public List<Extra> getExtrasOrderByPrice();
	
	public Extra getExtraByExtraType(ExtraType extraType);
	
	public Extra saveExtra(Extra extra);
}
