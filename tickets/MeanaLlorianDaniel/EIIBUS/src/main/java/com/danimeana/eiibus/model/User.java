package com.danimeana.eiibus.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Entity
public class User {

	@Id
	private String email;
	private String password;
	private String name;
	private String lastname;
	@Enumerated(EnumType.STRING)
	private DocumentType documentType;
	private String documentNumber;
	private String gender;
	private int age;
	private String laterality;

	public User() {
	}

	public User(String email, String password, String name, String lastname, DocumentType documentType,
			String documentNumber, String gender) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.lastname = lastname;
		this.documentType = documentType;
		this.documentNumber = documentNumber;
		this.gender = gender;
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
		return "User [email=" + email + ", password=" + password + ", name=" + name + ", lastname=" + lastname
				+ ", documentType=" + documentType + ", documentNumber=" + documentNumber 
				+ ", gender=" + gender + ", age=" + age + ", laterality=" + laterality + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		return true;
	}

}
