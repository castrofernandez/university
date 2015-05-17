package com.danimeana.eiibus.persistence.impl;

import java.sql.Timestamp;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.danimeana.eiibus.model.User;
import com.danimeana.eiibus.persistence.UserDataService;

@Repository
public class UserDAO implements UserDataService {

	@PersistenceContext
	private EntityManager em;

	@Override
	public void add(User user) {
		java.util.Date date = new java.util.Date();
		user.setTime(new Timestamp(date.getTime()));
		
		em.persist(user);
	}

	@Override
	public User findByEmail(String email) {
		User user = em.find(User.class, email);
		return user;
	}

	@Override
	public User update(User user) {
		return em.merge(user);
	}

}
