package dto;

public class ChangeProfileUsersDTO {

	public String userName;
	public String userName1;
	
	public String name;
	public String surname;
	public String date;
	public String gender;
	
	public String getUserName1() {
		return userName1;
	}
	public void setUserName1(String userName1) {
		this.userName1 = userName1;
	}
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
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	@Override
	public String toString() {
		return "ChangeProfileUsersDTO [userName=" + userName + ", userName1=" + userName1 + ", name=" + name
				+ ", surname=" + surname + ", date=" + date + ", gender=" + gender + "]";
	}

}
