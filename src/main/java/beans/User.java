package beans;

import java.util.Date;


public class User {
	public enum Roles {
		ADMINISTRATOR,MENAGER,DELIVERER,CUSTOMER
	}
	private String userName;
	private String password;
	private String name;
	private String surname;
	private Date date;
	private Roles role;
	
	public User(String userName, String password, String name, String surname, Date date, Roles role) {
		super();
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.date = date;
		this.role = role;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
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
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Roles getRole() {
		return role;
	}
	public void setRole(Roles role) {
		this.role = role;
	}

}