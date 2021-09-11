package dto;

import beans.User.CustomerType;
import beans.User.Roles;

public class SearchUsersDTO {
	public String name;
	public String userName;
	public Roles role;
	public String surname;
	public CustomerType customerType;
	public SearchUsersDTO(String name, String userName, Roles role, String surname, CustomerType customerType2) {
		super();
		this.name = name;
		this.userName = userName;
		this.role = role;
		this.surname = surname;
		this.customerType = customerType2;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Roles getRole() {
		return role;
	}
	public void setRole(Roles role) {
		this.role = role;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public CustomerType getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}
	public SearchUsersDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	



}
