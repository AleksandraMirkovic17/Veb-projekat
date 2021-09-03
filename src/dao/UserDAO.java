package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


import beans.User;
import beans.User.Roles;

public class UserDAO {
	
	private String path = "data/users.json";
	private ArrayList<User> users = new ArrayList<>();
	public static UserDAO userDAO= null;
	
	private UserDAO(){
		
	}
	
	public static UserDAO getInstance() {
		if(userDAO == null) {
			userDAO = new UserDAO();
		}
		return userDAO;
	}
    
	public void addUser(User newUser) {
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
	public ArrayList<User> getAllUsers(){
		readUser();
		
		ArrayList<User> users1=new ArrayList<User>();
		for(User u : users)
		{
			if(!u.logicalDeletion) users1.add(u);
		}
			
		return users1;
	}
	public ArrayList<User> getAllUsersRole(Roles role){
		ArrayList<User> allUsers=getAllUsers();
		ArrayList<User> search=new ArrayList<>();

		for(User u:allUsers)
		{
			if(u.role.equals(role))
			{
				search.add(u);
			}
		}

		return search;
	}

	public void changeUser(String userName, User changedUser) {
		ArrayList<User> allUsers = getAllUsers();
		for(int i=0; i<allUsers.size(); i++) {
			if(allUsers.get(i).getUserName().equals(userName)) {
				allUsers.set(i, changedUser);
				break;
			}
		}
		this.users = allUsers;
		saveAll();
		
	}

	
	

}
