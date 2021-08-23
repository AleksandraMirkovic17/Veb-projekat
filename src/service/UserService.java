package service;


import beans.Restaurant;
import beans.User;
import beans.User.Roles;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import dao.UserDAO;
import dto.UserRegistrationDTO;
import dto.ChangeProfilUserDTO;
import dto.UserLoginDTO;

public class UserService {
	private UserDAO userDAO;
	
	
	public UserService() {
		this.userDAO = UserDAO.getInstance();
	}
	
	public void registerUser(UserRegistrationDTO parametersForRegistration) throws ParseException {

	    System.out.println("User service stanje"+parametersForRegistration.role);
		User newUser = new User(parametersForRegistration.userName, parametersForRegistration.password, parametersForRegistration.name, parametersForRegistration.surname, parametersForRegistration.date,parametersForRegistration.gender,parametersForRegistration.role);
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
}
	
