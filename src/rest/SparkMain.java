package rest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Artical;
import beans.Location;
import beans.Restaurant;
import beans.Restaurant.Status;
import beans.Restaurant.TypeOfRestaurant;
import dto.CustomerRegistrationDTO;
import dto.UserLoginDTO;
import service.UserService;

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
			CustomerRegistrationDTO params = g.fromJson(req.body(), CustomerRegistrationDTO.class);
			userService.registerCustomer(params);
		return "OK";
		});
		
		get("rest/restaurants", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Artical a= new Artical("nesto",123.33,333,"nestooooo","nesto");
			Location n= new Location("nesto");
			
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
		    	
			return "OK";
		});
}}
