package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Customer;
import beans.User;

public class UserDAO {
	
	private String path = "data/users.json";
	private ArrayList<User> users = new ArrayList<>();
    
	public void addCustomer(User newUser) {
		readUser();
		this.users.add(newUser);
		saveAll();
	}
   public void readUser(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(path));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type usersarray = new TypeToken<ArrayList<User>>(){}.getType();
			Gson gson = new Gson();
				
			users = gson.fromJson(json, usersarray);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

	private void saveAll() {
		Gson gson = new Gson();
		String json = gson.toJson(this.users);
		try(PrintWriter out = new PrintWriter(path)){
			out.println(json);
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}

}
