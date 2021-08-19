package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Restaurant;

public class RestaurantDAO {

	private String path = "data/restaurants.json";
	private ArrayList<Restaurant> restaurants = new ArrayList<>();
	public static RestaurantDAO restaurantDAO = null;
	
	private RestaurantDAO() {}
	
	public static RestaurantDAO getInstance() {
		if(restaurantDAO == null) {
			restaurantDAO = new RestaurantDAO();
		}
		return restaurantDAO;
	}
    
	public void addRestaurant(Restaurant newRestaurant) {
		readRestaurants();
		this.restaurants.add(newRestaurant);
		saveAll();
	}
   public void readRestaurants(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(path));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type restaurantsarray = new TypeToken<ArrayList<Restaurant>>(){}.getType();
			Gson gson = new Gson();
				
			restaurants = gson.fromJson(json, restaurantsarray);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

	private void saveAll() {
		Gson gson = new Gson();
		String json = gson.toJson(this.restaurants);
		try(PrintWriter out = new PrintWriter(path)){
			out.println(json);
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}
	public void addAll(ArrayList<Restaurant> newListOfRestaurants)
	{
		this.restaurants = newListOfRestaurants;
		saveAll();
	}
	public ArrayList<Restaurant> getAllRestaurants(){
		readRestaurants();
		return restaurants;
	}
	
}
