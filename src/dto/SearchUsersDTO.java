package dto;

import beans.User.Roles;

public class SearchUsersDTO {
	public String name;
	public String userName;
	public Roles role;
	public String surname;
	public SearchUsersDTO(String name, String userName, Roles role, String surname) {
		super();
		this.name = name;
		this.userName = userName;
		this.role = role;
		this.surname = surname;
	}


}
