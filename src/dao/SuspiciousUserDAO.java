package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


import beans.SuspiciousUser;

public class SuspiciousUserDAO {
	
	private String path = "data/suspiciousUser.json";
	private ArrayList<SuspiciousUser> users = new ArrayList<>();
	public static SuspiciousUserDAO suspiciousUserDAO= null;
	
	private void suspiciousUserDAO(){
		
	}
	
	public static SuspiciousUserDAO getInstance() {
		if(suspiciousUserDAO == null) {
			suspiciousUserDAO = new SuspiciousUserDAO();
		}
		return suspiciousUserDAO;
	}
    
	public void addUser(SuspiciousUser newUser) {
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
		    
			java.lang.reflect.Type usersarray = new TypeToken<ArrayList<SuspiciousUser>>(){}.getType();
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
	public ArrayList<SuspiciousUser> getAllUsers(){
		readUser();
		return users;
	}
	public void changeSuspiciousUser(String userName, SuspiciousUser suspiciousUser) {
		ArrayList<SuspiciousUser> allUsers = getAllUsers();
		for(int i=0; i<allUsers.size(); i++) {
			if(allUsers.get(i).getUserName().equals(userName)) {
				allUsers.set(i, suspiciousUser);
			}
		}
		this.users = allUsers;
		saveAll();
		
	}

}
