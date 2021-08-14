package dao;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Customer;

public class CustomerDAO {
	
	private String path = "data/customers.json";
	private ArrayList<Customer> customers = new ArrayList<>();

	public void addCustomer(Customer newCustomer) {
		customers.add(newCustomer);
		saveAll();
	}

	private void saveAll() {
		Gson gson = new Gson();
		String json = gson.toJson(customers);
		try(PrintWriter out = new PrintWriter(path)){
			out.println(json);
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}

}
