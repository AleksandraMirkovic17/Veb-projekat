package rest;

import com.google.gson.Gson;

import dto.CustomerRegistrationDTO;
import service.UserService;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

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
	}
}
