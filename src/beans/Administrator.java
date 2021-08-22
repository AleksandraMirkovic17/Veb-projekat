package beans;



public class Administrator extends User {

	public Administrator(String userName, String password, String name, String surname, String date,Roles role,String gender) {
		super(userName, password, name, surname, date,gender,role);
		role=Roles.ADMINISTRATOR;
	}

}
