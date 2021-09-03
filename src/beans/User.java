package beans;


public class User{
	public enum Roles{ADMINISTRATOR,MANAGER,CUSTOMER,DELIVERER,ALL};
	
	public String userName;
	public String password;
	
	public String name;
	public String surname;
	

	public String date;
	public Roles role;
	public double discount;

	public String gender;
	public String restaurant; //if menager
	public Boolean logicalDeletion;
	
	
	public User(String userName, String password, String name, String surname, String date, Roles role, String gender,
			 Boolean logicalDeletion) {
		super();
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.date = date;
		this.role = role;
		this.gender = gender;
		this.logicalDeletion = logicalDeletion;
	}
	
	public User(String userName, String password, String name, String surname, String date,String gender,Roles role) {
		super();
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.date = date;
		this.gender=gender;
		this.role=role;
		this.logicalDeletion=false;
	}
	public User(String userName, String name, String surname, String date, String gender) {
		super();
		this.userName = userName;
		this.name = name;
		this.surname = surname;
		this.date = date;
		this.gender = gender;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	} 
	
	public Roles getRole() {
		return role;
	}
	public void setRole(Roles role) {
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
	public String getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
	public User(String userName, String password, String name, String surname, String date, Roles role, String gender,
			String restaurant) {
		super();
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.date = date;
		this.role = role;
		this.gender = gender;
		this.restaurant = restaurant;
	}
	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}
	@Override
	public String toString() {
		return "User [userName=" + userName + ", password=" + password + ", name=" + name + ", surname=" + surname
				+ ", date=" + date + ", role=" + role + ", gender=" + gender + ", restaurant=" + restaurant + "]";
	}
}
