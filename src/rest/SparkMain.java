package rest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Location;
import beans.Restaurant;
import beans.Restaurant.Status;
import beans.Restaurant.TypeOfRestaurant;
import dto.CustomerRegistrationDTO;
import dto.UserLoginDTO;
import service.UserService;

import static spark.Spark.*;

public class SparkMain {

	public static void main(String[] args) throws IOException {
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		after((req,res) -> res.type("application/json"));
		
		UserService userService = new UserService();
		Gson g = new Gson();
		
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
			Location l1 = new Location("12.11","122","Dunavska","121bb", "Novi Sad", "21000");
			Location l2 = new Location("12.11","122","Marinikova","1111", "Kikina", "122");
			Location l3 = new Location("12.11","122","Main street","121bb", "Los Angeles", "21000");


			Restaurant r1 = new Restaurant("Andreina kuhinja", TypeOfRestaurant.ITALIAN , Status.OPEN, l1 , null, "../images/podrazumevani-logo-restorana.jpg", 4.5);
			Restaurant r2 = new Restaurant("Andreina kuhinja 2", TypeOfRestaurant.ITALIAN , Status.OPEN, l2 , null, "../images/podrazumevani-logo-restorana.jpg", 2.1);
			Restaurant r3 = new Restaurant("Andreina kuhinja 2", TypeOfRestaurant.CHINESE , Status.OPEN, l3 , null, null, 3.7);


			ArrayList<Restaurant> restaurants = new ArrayList<Restaurant>();
			restaurants.add(r1);
			restaurants.add(r2);
			restaurants.add(r3);
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
