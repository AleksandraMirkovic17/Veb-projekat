package rest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;

import beans.Location;
import beans.Order;
import beans.Restaurant;
import beans.Restaurant.Status;
import beans.Restaurant.TypeOfRestaurant;
import beans.ShoppingChart;
import beans.User;
import beans.User.Roles;
import dao.RestaurantDAO;
import dto.UserRegistrationDTO;
import dto.AddItemToChartDTO;
import dto.AddingArticalToRestaurantDTO;
import dto.ChangeArticalDTO;
import dto.ChangeProfilUserDTO;
import dto.ChangeProfileUsersDTO;
import dto.ChangeQuantityInCartDTO;
import dto.ChangeRestaurantsStatusDTO;
import dto.CheckRestourantNameDTO;
import dto.NextStateDTO;
import dto.RestaurantRegistrationDTO;
import dto.SearchForRestaurantsParamsDTO;
import dto.SearchUsersDTO;
import dto.UserLoginDTO;
import service.OrderService;
import service.RestaurantService;
import service.ShoppingChartService;
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
		ShoppingChartService shoppingChartService = new ShoppingChartService();
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
		return restaurantService.NameExists(name);
		});
		
		get("rest/getRestaurantByName", (req, res) ->{
			res.type("application/json");
			res.status(200);
			String name = req.queryParams("name");
			System.out.println("Looking for restaurant "+name);
			Restaurant restaurant = restaurantService.getByName(name);
			return g.toJson(restaurant);
		});
		
		get("rest/ArticalNameExists", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String articalName = req.queryParams("name");
			String restaurantName = req.queryParams("restaurantname");
		return restaurantService.ArticalExists(articalName, restaurantName);
		});
		
		get("rest/ChangeArticalNameExists", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String oldName = req.queryParams("oldname");
			String articalName = req.queryParams("name");
			String restaurantName = req.queryParams("restaurantname");
		return restaurantService.ArticalExists(oldName, articalName, restaurantName);
		});
		
		
		
		get("rest/restaurants", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ArrayList<Restaurant> restaurants = restaurantService.getAll();
			System.out.println("Ucitali smo sve restorane");
			return g.toJson(restaurants);
			});
		
		get("rest/seeUsers", (req, res) -> {
			res.type("application/json");
			res.status(200);
			ArrayList<User> users = userService.getAllWithoutAdministrator();
			
			return g.toJson(users);
			});
		
		get("rest/searchUsers", (req, res) -> {
			res.type("application/json");
			res.status(200);
			String name = req.queryParams("name");
			String surname= req.queryParams("surname");
			String role = req.queryParams("role");
			String userName = req.queryParams("userName");
			
			SearchUsersDTO parametres = new SearchUsersDTO(name, userName, Roles.valueOf(role), surname);
			ArrayList<User> searchUsers = userService.searchUsers(parametres);
			return g.toJson(searchUsers);
		});
		

		post("rest/login", (req, res) -> {
			res.type("application/json");
			res.status(200);
			
			UserLoginDTO user = g.fromJson(req.body(), UserLoginDTO.class);
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
			return g.toJson(user);
		});
		
		get("rest/getShoppingCart", (req, res) ->{
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			User loggedInUser = ss.attribute("user");
			ShoppingChart sc = ShoppingChartService.getInstance().getByUsername(loggedInUser.getUserName());
			return g.toJson(sc);
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
		
		get("rest/getManagersOrders" , (req, res) ->{
			res.type("application/json");
			res.status(200);
			String restaurantsName = req.queryParams("restaurant");
			ArrayList<Order> orders = OrderService.getInstance().getByRestaurant(restaurantsName);
			System.out.println("pokusavam da pokupim narudzbine" +orders);
			return g.toJson(orders);
		});
		
		post("rest/registerRestaurant/", (req,res)->{
			res.type("application/json");
			res.status(200);
			RestaurantRegistrationDTO params = g.fromJson(req.body(), RestaurantRegistrationDTO.class);
			restaurantService.registerRestaurant(params);
			System.out.println(params);
		return "OK";
		});
		
		post("rest/addArticle/", (req,res) ->{
			res.type("application/json");
			res.status(200);
			AddingArticalToRestaurantDTO params = g.fromJson(req.body(), AddingArticalToRestaurantDTO.class);
			restaurantService.addArticleToRestaurant(params);
		return "OK";
		});
		

		put("rest/DeleteUser/", (req,res)->{
			res.type("application/json");
			res.status(200);
			ChangeProfileUsersDTO params = g.fromJson(req.body(), ChangeProfileUsersDTO.class);
			System.out.print(params.toString());
			if(userService.DeleteUser(params.userName)) 
			{

				ArrayList<User> users=userService.getAllWithoutAdministrator();
				return g.toJson(users);
			}
				
			
			return "Err";
		});
		
		put("rest/nextorderstate", (req, res) ->{
			res.type("application/json");
			res.status(200);
			NextStateDTO params = g.fromJson(req.body(), NextStateDTO.class);
			System.out.println("Menjamo stanje porudzbine: " + params.id);
			OrderService.getInstance().goToNextState(params.id);
			return "OK";
		});
		
		put("rest/ChangeInformationUsers/", (req,res)->{
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			
			ChangeProfileUsersDTO params = g.fromJson(req.body(), ChangeProfileUsersDTO.class);
			
			System.out.print(params.toString());
			
			if(params.userName.equals(params.userName1))
			{
				if(userService.ChangeUserInformationUsers(params,params.userName1))
				{
					ArrayList<User> users=userService.getAllWithoutAdministrator();
					return g.toJson(users);
				}
				else
				{
					return "ERR";
				}
					
			}
			else
			{
				if(userService.UsernameExists(params.userName))
				{
					return "Username exists";
				}
				else if(userService.ChangeUserInformationUsers(params,params.userName1))
				{
					ArrayList<User> users=userService.getAllWithoutAdministrator();
					return g.toJson(users);
				}
				else
				{
					return "ERR";
				}
	
			}
		});	
		

		post("rest/addToChart", (req, res)->{
			res.type("application/json");
			res.status(200);
			AddItemToChartDTO params = g.fromJson(req.body(), AddItemToChartDTO.class);
			System.out.println(params);
			shoppingChartService.addItemsToShoppingChart(params);
		return "OK";
		});
		
		post("rest/checkout", (req, res)->{
			res.type("application/json");
			res.status(200);
			String username = g.fromJson(req.body(), String.class);
			System.out.println(username+"is at checkout!");
			OrderService.getInstance().makeAnOrder(username);
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
		
		put("rest/changerestaurantstatus", (req,res) ->{
			String ret="";
			res.type("application/json");
			res.status(200);
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			ChangeRestaurantsStatusDTO params = g.fromJson(req.body(), ChangeRestaurantsStatusDTO.class);
			System.out.println(params.restaurantName+" "+ params.newStatus.toString());
			User manager = userService.getByRestaurant(params.restaurantName);
			

			if(user.getRole()!=Roles.MANAGER || manager == null || !manager.getUserName().equals(user.getUserName())) {
				System.out.println("You don't have a permission to change restaurant's status");
				ret = "Err:No permission";
			}
			restaurantService.changeRestaurantStatus(params);
			ret = "OK";
			return ret;
		});
		
		put("rest/changeartical", (req, res) ->{
			String ret="";
			res.type("application/json");
			res.status(200);
			
			ChangeArticalDTO params = g.fromJson(req.body(), ChangeArticalDTO.class);
			System.out.println(params);
			restaurantService.changeArtical(params);
			ret="OK";
			return ret;		
		});
		
		put("rest/changeQuantityInShoppingCart", (req, res)-> {
			String ret="";
			res.type("application/json");
			res.status(200);
			
			ChangeQuantityInCartDTO params = g.fromJson(req.body(), ChangeQuantityInCartDTO.class);
			shoppingChartService.changeQuantity(params);
			ret="OK";
			return ret;	
		});
		
		put("rest/DeleteInShoppingCart", (req, res)-> {
			String ret="";
			res.type("application/json");
			res.status(200);
			
			ChangeQuantityInCartDTO params = g.fromJson(req.body(), ChangeQuantityInCartDTO.class);
			shoppingChartService.deleteArtical(params);
			ret="OK";
			return ret;	
		});
		}
	}
