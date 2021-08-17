package service;


import beans.User;
import beans.User.Roles;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import dao.UserDAO;
import dto.UserRegistrationDTO;
import dto.UserLoginDTO;

public class UserService {
	private UserDAO userDAO;
	
	
	public UserService() {
		this.userDAO = new UserDAO();
	}
	public void registerUser(UserRegistrationDTO parametersForRegistration) throws ParseException {
	    SimpleDateFormat formatter2=new SimpleDateFormat("yyyy-MM-dd");
	    Date date = formatter2.parse(parametersForRegistration.date);
		User newUser = new User(parametersForRegistration.userName, parametersForRegistration.password, parametersForRegistration.name, parametersForRegistration.surname, date,parametersForRegistration.gender,parametersForRegistration.role);
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
}
	
