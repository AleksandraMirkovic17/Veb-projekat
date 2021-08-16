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
			Restaurant r1 = new Restaurant("Andreina kuhinja", TypeOfRestaurant.ITALIAN , Status.OPEN, new Location() , null, "images/podrazumevani-logo-restorana.jpg");
			Restaurant r2 = new Restaurant("Andreina kuhinja 2", TypeOfRestaurant.ITALIAN , Status.OPEN, new Location() , null, "images/podrazumevani-logo-restorana.jpg");

			ArrayList<Restaurant> restaurants = new ArrayList<Restaurant>();
			restaurants.add(r1);
			restaurants.add(r2);
			return g.toJson(restaurants);
		});
		
		

	}

}
