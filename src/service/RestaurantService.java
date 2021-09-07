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

import com.google.gson.JsonElement;

import beans.Artical;
import beans.Location;
import beans.Restaurant;
import beans.User;
import beans.Restaurant.Status;
import beans.Restaurant.TypeOfRestaurant;
import dao.RestaurantDAO;
import dto.AddingArticalToRestaurantDTO;
import dto.ChangeArticalDTO;
import dto.ChangeRestaurantsStatusDTO;
import dto.RestaurantRegistrationDTO;
import dto.SearchForRestaurantsParamsDTO;
import spark.utils.StringUtils;


public class RestaurantService {
	private RestaurantDAO restaurantDAO;
	
	public static RestaurantService restaurantService = null;
	public static RestaurantService getInstance() {
		if(restaurantService == null) {
			restaurantService = new RestaurantService();
		}
		return restaurantService;
	}

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
		ArrayList<Restaurant> allRestaurantsOpenFirst  = new ArrayList<Restaurant>();
		for(Restaurant r : allRestaurants) {
			if(r.getStatus().equals(Status.OPEN)) {
				allRestaurantsOpenFirst.add(r);
			}
		}
		for(Restaurant r : allRestaurants) {
			if(r.getStatus().equals(Status.CLOSED)) {
				allRestaurantsOpenFirst.add(r);
			}
		}
		return allRestaurantsOpenFirst;
	}

	public void registerRestaurant(RestaurantRegistrationDTO params) {
	    Location restaurantsLocation = new Location(params.longitude, params.latitude, params.street, params.houseNumber, params.city, params.postalCode);
	    Restaurant newRestaurant = new Restaurant(params.name, params.type, Status.OPEN, restaurantsLocation, new ArrayList<Artical>(), 
	    										"", 0.0);
	    newRestaurant = saveRestaurantsLogoImage(newRestaurant, params.imageRestaurant);
		restaurantDAO.addRestaurant(newRestaurant);
		UserService.getInstance().addRestaurantForMenager(params.menager, params.name);	
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

	public Restaurant getByName(String restaurantsName) {
		ArrayList<Restaurant> allRestaurants = restaurantDAO.getAllRestaurants();
		Restaurant ret = null;
		for(Restaurant r : allRestaurants ) {
			if(r.getName().equals(restaurantsName)) {
				ret=r;
				break;
			}
		}
		return ret;
	}

	public void changeRestaurantStatus(ChangeRestaurantsStatusDTO params) {
		Restaurant r = getByName(params.restaurantName);
		r.setStatus(params.newStatus);
		restaurantDAO.changeRestaurant(params.restaurantName, r);	
	}

	public Boolean ArticalExists(String articalName, String restaurantName) {
		Boolean exists = false;
		Restaurant restaurant = getByName(restaurantName);
		for(Artical a : restaurant.articles) {
			if(a.getNameArtical().equals(articalName)) {
				exists=true;
			}
		}
		return exists;
	}
	
	public boolean ArticalExists(String oldName, String articalName, String restaurantName) {
		Boolean exists = false;
		Restaurant restaurant = getByName(restaurantName);
		for(Artical a : restaurant.articles) {
			if(a.getNameArtical().equals(articalName) && (!articalName.equals(oldName))) {
				exists=true;
				break;
			}
		}
		return exists;
	}

	public void addArticleToRestaurant(AddingArticalToRestaurantDTO params) {
		Restaurant r = getByName(params.restaurant);
		Artical newArtical = new Artical(params.nameArtical, Double.parseDouble(params.price), params.type, 
				params.restaurant, covertToDoubleValue(params.quantity), params.description, null);
		newArtical = saveArticalsImage(newArtical, params.image);
		r.articles.add(newArtical);
		restaurantDAO.changeRestaurant(r.name, r);
				
		
	}
	
	public Artical saveArticalsImage(Artical articalWithoutImage, String image) {
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

        String imagePathName= "Images/"+ articalWithoutImage.getRestaurant() +"+"+ articalWithoutImage.getNameArtical()+ ".png";
       
        try {
        	File outputfile = new File(new File("./static").getCanonicalPath()+File.separator+imagePathName);
			ImageIO.write(imageDone, "png", outputfile);
		} catch (IOException e) {
			e.printStackTrace();
		}
        articalWithoutImage.setImage(imagePathName);
        return articalWithoutImage;
	}

	private double covertToDoubleValue(String quantity) {
		if(quantity==null || quantity=="") {
			return -1;
		}else {
			return Double.parseDouble(quantity);
		}
	}

	public void changeArtical(ChangeArticalDTO params) {
		Restaurant restaurant = getByName(params.restaurant);
		Artical changedArtical = new Artical(params.newNameArtical, Double.parseDouble(params.price), params.type,
				params.restaurant, covertToDoubleValue(params.quantity), params.description, null);
		if(params.oldImage.equals("")) {
			changedArtical = saveArticalsImage(changedArtical, params.newImage);
			System.out.print("old image empty");
		}else {
			changedArtical.setImage(params.oldImage);
			System.out.print("old image is not empty");
		}
		for(int i=0; i<restaurant.articles.size(); i++) {
			if(restaurant.articles.get(i).getNameArtical().equals(params.oldNameArtical)){
				restaurant.articles.set(i, changedArtical);
				break;
			}
		}
		restaurantDAO.changeRestaurant(restaurant.name, restaurant);		
	}

	public Artical getArticalByName(String restaurant, String nameArtical) {
		Artical ret = null;
		Restaurant rest = getByName(restaurant);
		for(Artical a : rest.articles) {
			if(a.getNameArtical().equals(nameArtical)) {
				ret = a;
				break;
			}
		}
		return ret;
	}

	public TypeOfRestaurant getRestaurantType(String restaurantsname) {
		Restaurant r = getByName(restaurantsname);
		return r.getTypeRestaurant();
	}


	


}
