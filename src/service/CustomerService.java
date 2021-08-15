package service;

import beans.Customer;
import beans.Order;
import beans.ShoppingChart;
import beans.User.Roles;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import dao.CustomerDAO;
import dto.CustomerRegistrationDTO;

public class CustomerService {
	private CustomerDAO customerDAO;
	
	public CustomerService() {
		this.customerDAO = new CustomerDAO();
	}
	public void registerCustomer(CustomerRegistrationDTO parametersForRegistration) throws ParseException {
	    SimpleDateFormat formatter2=new SimpleDateFormat("yyyy-MM-dd");
	    Date date = formatter2.parse(parametersForRegistration.date);

		Customer newCustomer = new Customer(parametersForRegistration.userName, parametersForRegistration.password, parametersForRegistration.name, parametersForRegistration.surname, date,parametersForRegistration.gender,Roles.CUSTOMER);
		customerDAO.addCustomer(newCustomer);
	}
}
