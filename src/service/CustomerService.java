package service;

import beans.Customer;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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

		Customer newCustomer = new Customer(parametersForRegistration.userName, parametersForRegistration.password, parametersForRegistration.name, parametersForRegistration.surname, date);
		customerDAO.addCustomer(newCustomer);
	}
}
