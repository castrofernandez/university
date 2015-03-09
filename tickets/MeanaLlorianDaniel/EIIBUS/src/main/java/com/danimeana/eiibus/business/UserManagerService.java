package com.danimeana.eiibus.business;

import com.danimeana.eiibus.model.User;

public interface UserManagerService {
	
	public void addUser(User user);
	
	public User getUserByEmail(String email);

	public User updateUser(User user);
}
