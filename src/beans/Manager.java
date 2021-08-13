package beans;

import java.util.Date;

import beans.User.Roles;

public class Manager extends User{
	
	public Manager(String userName, String password, String name, String surname, Date date) {
		super(userName, password, name, surname, date);
		// TODO Auto-generated constructor stub
		Roles role=Roles.Manager;
	}

	public Restaurant restaurant;

}
