package rest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Location;
import beans.Restaurant;
import beans.Restaurant.Status;
import beans.Restaurant.TypeOfRestaurant;
import beans.User;
import dao.RestaurantDAO;
import dto.UserRegistrationDTO;
import dto.ChangeProfilUserDTO;
import dto.CheckRestourantNameDTO;
import dto.RestaurantRegistrationDTO;
import dto.SearchForRestaurantsParamsDTO;
import dto.UserLoginDTO;
import service.RestaurantService;
import service.UserService;
import spark.Session;

import static spark.Spark.*;

public class SparkMain {

	public static void main(String[] args) throws IOException {
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		after((req,res) -> res.type("application/json"));
		
		UserService userService = new UserService();
		RestaurantService restaurantService = new RestaurantService();
		Gson g = new Gson();
		
		post("rest/CustomerReg/", (req, res) ->{
			res.type("application/json");
			res.status(200);
			UserRegistrationDTO params = g.fromJson(req.body(), UserRegistrationDTO.class);
			userService.registerUser(params);
			System.out.println(params);
		return "OK";
		});
		
		post("rest/usernameExists", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String username = g.fromJson(req.body(), String.class);
		return userService.UsernameExists(username);
		});
		
		get("rest/RestourantsNameExists", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String name= req.queryParams("name");
			System.out.println("SparkMain provera poklapanja imena restorana "+name);
		return restaurantService.NameExists(name);
		});
		
		
		
		get("rest/restaurants", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ArrayList<Restaurant> restaurants = restaurantService.getAll();
			System.out.println("Ucitali smo sve restorane");
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
			System.out.println("SparkMain napravljena je sesija!");
			User proveraSesije = ss.attribute("user");
			System.out.println("SparkMain provera sesije, korisnik "+proveraSesije.getUserName()+" uspesno zakacen na sesiju!");
			return  g.toJson(loginUser);
		});
		
		get("rest/testlogin", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			Session ss = req.session(true);
			User user = ss.attribute("user");	
			if(user == null) {
				System.out.println("Test main: USER IS NULL (while testing testlogin)");
				return "Err:UserIsNotLoggedIn";
			}else {
				System.out.println("TestMain testiranje testlogina, korisnik "+ user.getUserName()+" je ulogovan na aplikaciju!");

			}
			System.out.println(g.toJson(user));
			return g.toJson(user);
		});
		
		get("rest/logout", (req, res) -> {
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			User loggedInUser = ss.attribute("user");
			ss.invalidate();
			System.out.println("See you soon "+loggedInUser.userName+"!");
			
			
			return "OK";
		});
		
		get("rest/searchRestaurants", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String name = req.queryParams("name");
			String location= req.queryParams("location");
			String rating = req.queryParams("rating");
			String type = req.queryParams("type");
			String onlyopened = req.queryParams("onlyopened");
			SearchForRestaurantsParamsDTO parametres = new SearchForRestaurantsParamsDTO(name, location, rating, type, onlyopened);
			ArrayList<Restaurant> searchedRestaurants = restaurantService.searchRestaurants(parametres);
			return g.toJson(searchedRestaurants);
		});
		
		get("rest/freeMenagers", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ArrayList<User> freeMenagers = userService.searchFreeMenagers();
			if(freeMenagers.size()==0) {
				freeMenagers = null;
			}
			return g.toJson(freeMenagers);
		});
		
		get("rest/loadrestmanager/", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String restaurantsName = req.queryParams("restaurantname");
			Restaurant restaurant = restaurantService.getByName(restaurantsName);
			if(restaurant == null) {
				System.out.println("SparkMain-restaurant does not exists!");
				return "NotExsists";
			}else {
				System.out.println("SparkMain"+restaurant.toString());
			}
			return g.toJson(restaurant);
		});
		
		post("rest/registerRestaurant/", (req,res)->{
			res.type("application/json");
			res.status(200);
			RestaurantRegistrationDTO params = g.fromJson(req.body(), RestaurantRegistrationDTO.class);
			restaurantService.registerRestaurant(params);
			System.out.println(params);
		return "OK";
		});
		
		put("rest/ChangeInformation/", (req,res)->{
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			ChangeProfilUserDTO params = g.fromJson(req.body(), ChangeProfilUserDTO.class);
	
			if(userService.UsernameExists(params.userName) && !user.userName.equals(params.userName))
			{
				return "Username exists";
			}
			else if(userService.ChangeUserInformation(params,user))
			{
				
				return "OK";
			}

		return "Err:SomethingIsWrong";
		});	
		}
	}
