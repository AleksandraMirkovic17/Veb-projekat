package beans;

import java.util.Date;

import beans.User.Roles;

public class Manager extends User{
	
	public Manager(String userName, String password, String name, String surname, Date date,String gender,Roles role) {
		super(userName, password, name, surname, date,gender,role);
		// TODO Auto-generated constructor stub
		role=Roles.MANAGER;
	}

	public Restaurant restaurant;

}
