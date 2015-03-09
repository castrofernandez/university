package com.danimeana.eiibus.presentation.profile.dto;

import com.danimeana.eiibus.model.DocumentType;
import com.danimeana.eiibus.model.User;

public class UserDTO {

	public static UserDTO getUserDTO(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setEmail(user.getEmail());
		userDTO.setName(user.getName());
		userDTO.setLastname(user.getLastname());
		userDTO.setDocumentType(user.getDocumentType());
		userDTO.setDocumentNumber(user.getDocumentNumber());
		return userDTO;
	}

	private String name;
	private String lastname;
	private DocumentType documentType;
	private String documentNumber;
	private String email;
	private String password;
	private String confirmPassword;
	private String oldPassword;

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

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	@Override
	public String toString() {
		return "UserDTO [name=" + name + ", lastname=" + lastname + ", documentType=" + documentType
				+ ", documentNumber=" + documentNumber + ", email=" + email + ", password=" + password
				+ ", confirmPassword=" + confirmPassword + ", oldPassword=" + oldPassword + "]";
	}

}
