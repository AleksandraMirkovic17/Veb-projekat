package beans;

import java.util.Date;

public class Administrator extends User {

	public Administrator(String userName, String password, String name, String surname, Date date,Roles role,String gender) {
		super(userName, password, name, surname, date,gender,role);
		// TODO Auto-generated constructor stub
		role=Roles.ADMINISTRATOR;
	}

}
