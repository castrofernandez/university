package com.danimeana.eiibus.presentation.login.dto;

import com.danimeana.eiibus.model.DocumentType;
import com.danimeana.eiibus.model.User;

public class UserDTO {

	private String name;
	private String lastname;
	private DocumentType documentType;
	private String documentNumber;
	private String email;
	private String password;
	private String confirmPassword;
	private String gender;
	private int age;
	private String laterality;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public DocumentType getDocumentType() {
		return documentType;
	}

	public void setDocumentType(DocumentType documentType) {
		this.documentType = documentType;
	}

	public String getDocumentNumber() {
		return documentNumber;
	}

	public void setDocumentNumber(String documentNumber) {
		this.documentNumber = documentNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	
	public String getGender() {
		return gender;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public int getAge() {
		return age;
	}
	
	public void setAge(int age) {
		this.age = age;
	}
	
	public String getLaterality() {
		return laterality;
	}
	
	public void setLaterality(String laterality) {
		this.laterality = laterality;
	}

	@Override
	public String toString() {
		return "UserDTO [name=" + name + ", lastname=" + lastname + ", documentType=" + documentType
				+ ", documentNumber=" + documentNumber + ", email=" + email + ", password=" + password
				+ ", confirmPassword=" + confirmPassword + "]";
	}
	
	public User createUser() {
		User user = new User();
		user.setName(name);
		user.setLastname(lastname);
		user.setEmail(email);
		user.setPassword(password);
		user.setDocumentType(documentType);
		user.setDocumentNumber(documentNumber);
		user.setGender(gender);
		user.setAge(age);
		user.setLaterality(laterality);
		return user;
	}

}
