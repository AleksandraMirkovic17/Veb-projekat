package beans;

import java.util.ArrayList;

import beans.User.Roles;

public class SuspiciousUser {
	public String userName;
	public String name;
	public String surname;
	public int numberCenc;
	public int points;
	public ArrayList<String> dates;
	public Boolean blocked;
	public Roles role;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
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
	public int getNumberCenc() {
		return numberCenc;
	}
	public void setNumberCenc(int numberCenc) {
		this.numberCenc = numberCenc;
	}
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}
	public ArrayList<String> getDates() {
		return dates;
	}
	public void setDates(ArrayList<String> dates) {
		this.dates = dates;
	}
	public Boolean getBlocked() {
		return blocked;
	}
	public void setBlocked(Boolean blocked) {
		this.blocked = blocked;
	}
	public Roles getRole() {
		return role;
	}
	public void setRole(Roles role) {
		this.role = role;
	}
	public SuspiciousUser(String userName, String name, String surname, int numberCenc, int points,
			ArrayList<String> dates, Boolean blocked, Roles role) {
		super();
		this.userName = userName;
		this.name = name;
		this.surname = surname;
		this.numberCenc = numberCenc;
		this.points = points;
		this.dates = new ArrayList<String>();
		this.blocked = blocked;
		this.role = role;
	}
	public SuspiciousUser() {
		super();
		// TODO Auto-generated constructor stub
		this.dates = new ArrayList<String>();
	}

	
}
