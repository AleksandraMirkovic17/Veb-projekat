package beans;

import java.util.Date;

public class Administrator extends User {

	public Administrator(String userName, String password, String name, String surname, Date date,Roles role) {
		super(userName, password, name, surname, date);
		// TODO Auto-generated constructor stub
		role=Roles.Administrator;
	}

}
