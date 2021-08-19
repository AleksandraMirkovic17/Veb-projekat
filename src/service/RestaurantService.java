package service;

import java.util.ArrayList;


import beans.Location;
import beans.Restaurant;
import beans.Restaurant.Status;
import dao.RestaurantDAO;
import dto.SearchForRestaurantsParamsDTO;
import spark.utils.StringUtils;


public class RestaurantService {
	private RestaurantDAO restaurantDAO;

	public RestaurantService() {
		this.restaurantDAO = RestaurantDAO.getInstance();
	}

	public ArrayList<Restaurant> searchRestaurants(SearchForRestaurantsParamsDTO parametres) {
		ArrayList<Restaurant> SearchedRestaurants = new ArrayList<>();
		ArrayList<Restaurant> allRestaurants = restaurantDAO.getAllRestaurants();
		for(Restaurant restaurant : allRestaurants) {
			if(restaurant.getName().contains(parametres.name.trim())) {
				if(((int)restaurant.getRating()) >= (Integer.parseInt(parametres.rating))) {
					if(locationContainsString(restaurant.getLocation(), parametres.location)) {
						if(restaurant.getTypeRestaurant().toString().equals(parametres.type)
								|| parametres.type.equals("ALL")) {
							if(Boolean.parseBoolean(parametres.onlyopened)) {
								if(restaurant.status == Status.OPEN) {
									SearchedRestaurants.add(restaurant);
								}
							}
							else
							{
								SearchedRestaurants.add(restaurant);
			}}}}}}
		return SearchedRestaurants;
	}

	private boolean locationContainsString(Location location, String enteredLocation) {
		boolean contains = true;
		String enteredLocationRe = enteredLocation.replaceAll(",", " ").trim();
		String [] enteredLocationSplited = enteredLocationRe.split(" ");
		for(String s : enteredLocationSplited) {
			if(!(location.city.contains(s) || location.street.contains(s) || location.houseNumber.contains(s) 
					|| location.postalCode.contains(s))) {
				contains = false;
				break;
			}
		}
		return contains;
	}

}
