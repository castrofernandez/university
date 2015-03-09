package com.danimeana.eiibus.business.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danimeana.eiibus.business.UserManagerService;
import com.danimeana.eiibus.model.User;
import com.danimeana.eiibus.persistence.UserDataService;

@Service
@Transactional
public class UserManagerServiceImpl implements UserManagerService {

	@Autowired
	private UserDataService userDataService;

	@Override
	public void addUser(User user) {
		userDataService.add(user);
	}

	@Override
	public User getUserByEmail(String email) {
		return userDataService.findByEmail(email);
	}

	@Override
	public User updateUser(User user) {
		return userDataService.update(user);
	}

}
