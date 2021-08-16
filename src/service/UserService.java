package service;

import beans.Customer;
import beans.Order;
import beans.ShoppingChart;
import beans.User;
import beans.User.Roles;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import dao.UserDAO;
import dto.CustomerRegistrationDTO;
import dto.UserLoginDTO;

public class UserService {
	private UserDAO userDAO;
	
	
	public UserService() {
		this.userDAO = new UserDAO();
	}
	public void registerCustomer(CustomerRegistrationDTO parametersForRegistration) throws ParseException {
	    SimpleDateFormat formatter2=new SimpleDateFormat("yyyy-MM-dd");
	    Date date = formatter2.parse(parametersForRegistration.date);
		User newUser = new User(parametersForRegistration.userName, parametersForRegistration.password, parametersForRegistration.name, parametersForRegistration.surname, date,parametersForRegistration.gender,Roles.CUSTOMER);
		userDAO.addCustomer(newUser);
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
	
	
	
}
