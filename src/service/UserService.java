package service;


import beans.Restaurant;
import beans.User;
import beans.Restaurant.Status;
import beans.User.Roles;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import dao.UserDAO;
import dto.UserRegistrationDTO;
import dto.ChangeProfilUserDTO;
import dto.ChangeProfileUsersDTO;
import dto.SearchForRestaurantsParamsDTO;
import dto.SearchUsersDTO;
import dto.UserLoginDTO;

public class UserService {
	private UserDAO userDAO;
	public static UserService userService= null;
	public static UserService getInstance() {
		if(userService == null) {
			userService = new UserService();
		}
		return userService;
	}
	
	
	
	public UserService() {
		userService = this;
		this.userDAO = UserDAO.getInstance();
	}
	
	
	public ArrayList<User> searchUsers(SearchUsersDTO parametres) {
		
		ArrayList<User> users= new ArrayList<User>();
		ArrayList<User> searchUsers= new ArrayList<>();

		if(parametres.role.equals(Roles.ALL))
		{
			users=getAllWithoutAdministrator();
		}
		else
		{
			users=userDAO.getAllUsersRole(parametres.role);
		}

		for(User u : users)
		{
			if(u.name.contains(parametres.name) && u.surname.contains(parametres.surname) && u.userName.contains(parametres.userName)) searchUsers.add(u);
		}
		
		return searchUsers;
		
	}
	
	public void registerUser(UserRegistrationDTO parametersForRegistration) throws ParseException {

	    System.out.println("User service stanje"+parametersForRegistration.role);
		User newUser = new User(parametersForRegistration.userName, parametersForRegistration.password, parametersForRegistration.name, parametersForRegistration.surname, parametersForRegistration.date,parametersForRegistration.gender,parametersForRegistration.role);
		if(newUser.getRole()==Roles.CUSTOMER) {
			ShoppingChartService.getInstance().addNewShoppingChart(newUser.getUserName());
		}
		userDAO.addUser(newUser);
	}
	
	public boolean isExistUser(UserLoginDTO user)
	{
		ArrayList<User> users=userDAO.getAllUsers();
		for(User u : users)
		{
			if(user.userName.equals(u.userName) && user.password.equals(u.password)) return true;	
		}
		return false;
	}
	
	public User loginUser(UserLoginDTO user)
	{
		ArrayList<User> users=userDAO.getAllUsers();
		for(User u :users)
		{
			if(user.userName.equals(u.userName) && user.password.equals(u.password)) return u;
		}
		return null;
	}
	
	public boolean UsernameExists(String username) {
		boolean exists = false;
		ArrayList<User> users=userDAO.getAllUsers();
		
		if(users !=null)
		{
		for(User u : users)
			if(username.equals(u.userName)) {
				exists=true;
				break;
			}
		}
		return exists;
	}

	public ArrayList<User> searchFreeMenagers() {
		ArrayList<User> freeMenagers = new ArrayList<User>();
		ArrayList<User> allUsers = userDAO.getAllUsers();
		
		for(User u : allUsers) {
			if(u.getRole()==Roles.MANAGER && (u.getRestaurant()==null || u.getRestaurant()=="" )) {
				freeMenagers.add(u);
			}
		}
		return freeMenagers;
	}

	public void addRestaurantForMenager(String menager, String name) {
		ArrayList<User> allFreeMenagers = searchFreeMenagers();
		for(User u : allFreeMenagers) {
			if(u.getUserName().equals(menager)) {
				u.restaurant = name;
				userDAO.changeUser(u.getUserName(), u);
				break;
			}
		}
		
	}
	public boolean ChangeUserInformation(ChangeProfilUserDTO user,User oldUser)
	 {
		ArrayList<User> allUsers = userDAO.getAllUsers();
		for(User u : allUsers)
		{
			if(u.getUserName().equals(oldUser.userName))
			{
				User newUser=new User(user.userName,oldUser.password,user.name,user.surname,user.date,user.gender,oldUser.getRole());
				userDAO.changeUser(u.getUserName(), newUser);
				if (oldUser.getRole() == Roles.CUSTOMER && !(oldUser.getUserName().equals(user.userName))) {
					ShoppingChartService.getInstance().changeUserName(oldUser.getUserName(), user.userName);
				}
				return true;
			}	
		}
		return false;
	 }
	
	public boolean ChangeUserInformationUsers(ChangeProfileUsersDTO user,String userName1)
	 {
		ArrayList<User> allUsers = userDAO.getAllUsers();
		for(User u : allUsers)
		{
			if(u.getUserName().equals(userName1))
			{
				User newUser=new User(user.userName,u.password,user.name,user.surname,user.date,user.gender,u.getRole());
				userDAO.changeUser(userName1, newUser);
				return true;
			}	
		}
		return false;
	 }

	public User getByRestaurant(String restaurantName) {
		User ret = null;
		ArrayList<User> allUsers= userDAO.getAllUsers();
		for(User u : allUsers) {
			if (u.getRole()== Roles.MANAGER && u.getRestaurant().equals(restaurantName)) {
				ret = u;
				break;
			}
		}
		return ret;
	}
	
	public User getByUsername(String username) {
		User ret = null;
		ArrayList<User> allUsers= userDAO.getAllUsers();
		for(User u : allUsers) {
			if (u.getUserName().equals(username)) {
				ret = u;
				break;
			}
		}
		return ret;
	}
	
	public ArrayList<User> getAllWithoutAdministrator() {
		ArrayList<User> allUsers = userDAO.getAllUsers();
		for(User u : allUsers) {
			if(u.role.equals(Roles.ADMINISTRATOR)) {
				allUsers.remove(u);
				break;
			}
		}
						
		return allUsers;
	}
	public Boolean DeleteUser(String userName)
	{
		ArrayList<User> allUsers = userDAO.getAllUsers();
		for(User u : allUsers)
		{
			if(u.getUserName().equals(userName))
			{
				
				User newUser=new User(u.userName,u.password,u.name,u.surname,u.date,u.getRole(),u.gender,true);
				
				userDAO.changeUser(userName, newUser);
				return true;
			}	
		}
		return false;
	}
	
}
	
