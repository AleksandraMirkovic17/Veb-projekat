package dto;

import java.util.Date;

import beans.User.Gender;
import beans.User.Roles;

public class CustomerRegistrationDTO {
	public String userName;
	public String password;
	public String name;
	private String surname;
	private Date date;
	public Gender gender;
}
