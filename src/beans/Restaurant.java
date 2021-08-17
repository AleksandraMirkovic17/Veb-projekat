package beans;

import java.util.ArrayList;



public class Restaurant {
    public enum TypeOfRestaurant{
   	 ITALIAN,BARBECUE,CHINESE
    };
    public enum Status{
   	 OPEN,CLOSED
   	 };
   	 
    public String name;
    public TypeOfRestaurant typeRestaurant;
    public Status status;
    public Location location=new Location();
    public ArrayList<Artical> articles= new ArrayList<Artical>();
    public String imageRestaurant;
    public double rating;
    
	public Restaurant() {
		super();
		articles = new ArrayList<Artical>();
		location=new Location();		
	}
	public Restaurant(String name, TypeOfRestaurant typeRestaurant, Status status, Location location,
			ArrayList<Artical> articles, String imageRestaurant, double rating) {
		super();
		this.name = name;
		this.typeRestaurant = typeRestaurant;
		this.status = status;
		this.location = location;
		this.articles = articles;
		this.imageRestaurant = imageRestaurant;
		this.rating = rating;
	}
	
	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public TypeOfRestaurant getTypeRestaurant() {
		return typeRestaurant;
	}
	public void setTypeRestaurant(TypeOfRestaurant typeRestaurant) {
		this.typeRestaurant = typeRestaurant;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public ArrayList<Artical> getArticles() {
		return articles;
	}
	public void setArticles(ArrayList<Artical> articles) {
		this.articles = articles;
	}
	public String getImageRestaurant() {
		return imageRestaurant;
	}
	public void setImageRestaurant(String imageRestaurant) {
		this.imageRestaurant = imageRestaurant;
	}
}
