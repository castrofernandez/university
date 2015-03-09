package com.danimeana.eiibus.persistence;

import com.danimeana.eiibus.model.User;

public interface UserDataService {

	public void add(User user);

	public User findByEmail(String email);

	public User update(User user);
}
