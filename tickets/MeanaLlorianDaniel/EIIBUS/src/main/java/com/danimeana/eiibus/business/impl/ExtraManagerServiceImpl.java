package com.danimeana.eiibus.business.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.ExtraManagerService;
import com.danimeana.eiibus.model.Extra;
import com.danimeana.eiibus.model.ExtraType;
import com.danimeana.eiibus.persistence.ExtraDataService;

@Service
@Transactional
public class ExtraManagerServiceImpl implements ExtraManagerService {

	@Autowired
	private ExtraDataService extraDataService;

	@Override
	public List<Extra> getExtrasOrderByPrice() {
		return extraDataService.findAllOrderByPrice();
	}

	@Override
	public Extra getExtraByExtraType(ExtraType extraType) {
		return extraDataService.findByExtraType(extraType);
	}

	@Override
	public Extra saveExtra(Extra extra) {
		return extraDataService.save(extra);
	}

}
