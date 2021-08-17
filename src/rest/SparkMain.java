package rest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Restaurant;
import beans.Restaurant.Status;
import beans.Restaurant.TypeOfRestaurant;
import beans.User;
import dto.UserRegistrationDTO;
import dto.UserLoginDTO;
import service.UserService;
import spark.Session;

import static spark.Spark.*;

public class SparkMain {
	private static Gson g = new Gson();

	public static void main(String[] args) throws IOException {
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		after((req,res) -> res.type("application/json"));
		
		UserService userService = new UserService();
		
		
		post("rest/CustomerReg/", (req, res) ->{
			res.type("application/json");
			res.status(200);
			UserRegistrationDTO params = g.fromJson(req.body(), UserRegistrationDTO.class);
			userService.registerUser(params);
		return "OK";
		});
		
		get("rest/restaurants", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			
			Restaurant r1 = new Restaurant("Andreina kuhinja",TypeOfRestaurant.ITALIAN,Status.OPEN,null,null,"images/podrazumevani-logo-restorana.jpg");
			Restaurant r2 = new Restaurant("Andreina kuhinja 2",TypeOfRestaurant.ITALIAN,Status.OPEN, null,null,"images/podrazumevani-logo-restorana.jpg");

			ArrayList<Restaurant> restaurants = new ArrayList<Restaurant>();
			restaurants.add(r1);
			restaurants.add(r2);
			System.out.println("haahaaj");
			
			return g.toJson(restaurants);
			});
		

		get("rest/login", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			UserLoginDTO user = new UserLoginDTO(); 
			user.userName = req.queryParams("userName");
		    user.password = req.queryParams("password");
		    if(!userService.isExistUser(user))
		    	return "YOUR ACCOUNT DOES NOT EXIST IN THE SYSTEM, PLEASE REGISTER!";
		    
		    User loginUser=userService.loginUser(user);
           res.cookie("userCOOKIE", loginUser.getUserName());             // set cookie with a value
			
			Session ss = req.session(true);
			ss.attribute("user", loginUser);	
			return  g.toJson(loginUser);
		});
		get("rest/testlogin", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			User user = ss.attribute("user");	 
			if(user == null) {
				System.out.println("USER IS NULL");
				return "Err:UserIsNotLoggedIn";
			}
			return g.toJson(user);
		});
			
			
}}
