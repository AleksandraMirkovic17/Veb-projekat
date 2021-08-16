package rest;

import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;

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
			System.out.print("ovde sam");
			res.type("application/json");
			res.status(200);
			CustomerRegistrationDTO params = g.fromJson(req.body(), CustomerRegistrationDTO.class);
			userService.registerCustomer(params);
		return "OK";
		});
		
		

	}

}
