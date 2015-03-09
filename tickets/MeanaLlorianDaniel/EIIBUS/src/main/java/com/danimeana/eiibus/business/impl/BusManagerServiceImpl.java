package com.danimeana.eiibus.business.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.BusManagerService;
import com.danimeana.eiibus.model.Bus;
import com.danimeana.eiibus.persistence.BusDataService;

@Service
@Transactional
public class BusManagerServiceImpl implements BusManagerService {

	@Autowired
	private BusDataService busDataService;

	@Override
	public Bus saveBus(Bus bus) {
		return busDataService.save(bus);
	}

}
