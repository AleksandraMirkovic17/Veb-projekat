package service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;

import javax.imageio.ImageIO;

import beans.Artical;
import beans.Location;
import beans.Restaurant;
import beans.User;
import beans.Restaurant.Status;
import dao.RestaurantDAO;
import dto.RestaurantRegistrationDTO;
import dto.SearchForRestaurantsParamsDTO;
import spark.utils.StringUtils;


public class RestaurantService {
	private RestaurantDAO restaurantDAO;
	private UserService userService;

	public RestaurantService() {
		this.restaurantDAO = RestaurantDAO.getInstance();
		this.userService = new UserService();
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

	public boolean NameExists(String name) {
		boolean exists = false;
		ArrayList<Restaurant> restaurants = restaurantDAO.getAllRestaurants();
		for(Restaurant r : restaurants) {
			System.out.println("Restoran servis provera poklapanja imena restorana "+name+" "+r.name);
			if(name.equals(r.name)) {
				exists=true;
				break;
			}
		}
		return exists;
	}

	public ArrayList<Restaurant> getAll() {
		ArrayList<Restaurant> allRestaurants = restaurantDAO.getAllRestaurants();
		return allRestaurants;
	}

	public void registerRestaurant(RestaurantRegistrationDTO params) {
	    System.out.println("Restaurant service stanje"+params.city);
	    Location restaurantsLocation = new Location(params.longitude, params.latitude, params.street, params.houseNumber, params.city, params.postalCode);
	    Restaurant newRestaurant = new Restaurant(params.name, params.type, Status.OPEN, restaurantsLocation, new ArrayList<Artical>(), 
	    										"", 0.0);
	    newRestaurant = saveRestaurantsLogoImage(newRestaurant, params.imageRestaurant);
		restaurantDAO.addRestaurant(newRestaurant);
		userService.addRestaurantForMenager(params.menager, params.name);	
	}
	
	public Restaurant saveRestaurantsLogoImage(Restaurant restaurantWithoutImage, String image) {
		String imageString = image.split(",")[1];		
		BufferedImage imageDone = null;
        byte[] imageByte;
        imageByte = Base64.getDecoder().decode(imageString);
        ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
        try {
			imageDone = ImageIO.read(bis);
		} catch (IOException e) {
			e.printStackTrace();
		}
        try {
			bis.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

        String imagePathName= "Images/"+ restaurantWithoutImage.getName() + ".png";
       
        try {
        	File outputfile = new File(new File("./static").getCanonicalPath()+File.separator+imagePathName);
			ImageIO.write(imageDone, "png", outputfile);
		} catch (IOException e) {
			e.printStackTrace();
		}
        restaurantWithoutImage.setImageRestaurant(imagePathName);
        return restaurantWithoutImage;
	}

}
