package rest;

import com.google.gson.Gson;

import beans.Location;
import beans.Restaurant;
import beans.Restaurant.Status;
import beans.Restaurant.TypeOfRestaurant;
import dto.CustomerRegistrationDTO;
import dto.UserLoginDTO;
import service.UserService;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.ArrayList;

public class CustomersRest {
	private static Gson g;
	private UserService userService;
	
	public CustomersRest(UserService userService) {
		this.userService = userService;
		g = new Gson();
		
		post("rest/CustomerRegistration/", (req, res) ->{
			res.type("application/json");
			res.status(200);
			CustomerRegistrationDTO params = g.fromJson(req.body(), CustomerRegistrationDTO.class);
			userService.registerCustomer(params);
		return "OK";
		});
		
		get("rest/login", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			UserLoginDTO user = new UserLoginDTO(); 
			user.userName = req.queryParams("userName");
		    user.password = req.queryParams("password");
		    System.out.println("POKUSAJ LOGOVANJA: "+user.userName+ " " + user.password);
			
			return "OK";
		});
		
		get("rest/restaurants", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Restaurant r1 = new Restaurant("Andreina kuhinja", TypeOfRestaurant.ITALIAN , Status.OPEN, new Location() , null, "images/podrazumevani-logo-restorana.jpg");
			Restaurant r2 = new Restaurant("Andreina kuhinja 2", TypeOfRestaurant.ITALIAN , Status.OPEN, new Location() , null, "images/podrazumevani-logo-restorana.jpg");

			ArrayList<Restaurant> restaurants = new ArrayList<Restaurant>();
			restaurants.add(r1);
			restaurants.add(r2);
			System.out.println("haahaaj");
			return g.toJson(restaurants);});
  }
}
