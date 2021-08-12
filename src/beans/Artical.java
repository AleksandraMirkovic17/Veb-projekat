package beans;

import javax.swing.ImageIcon;

public class Artical {
	
	public String nameArtical;
	public double price;
	public enum Type{DISH, DRINK};
	public Type typeArtical;
	public Restaurant restaurant;
	public double quantity;
	public String description;
	public ImageIcon image;
	public String getNameArtical() {
		return nameArtical;
	}
	public void setNameArtical(String nameArtical) {
		this.nameArtical = nameArtical;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Type getTypeArtical() {
		return typeArtical;
	}
	public void setTypeArtical(Type typeArtical) {
		this.typeArtical = typeArtical;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public ImageIcon getImage() {
		return image;
	}
	public void setImage(ImageIcon image) {
		this.image = image;
	}
	public Artical(String nameArtical, double price, Type typeArtical, Restaurant restaurant, double quantity,
			String description, ImageIcon image) {
		super();
		this.nameArtical = nameArtical;
		this.price = price;
		this.typeArtical = typeArtical;
		this.restaurant = restaurant;
		this.quantity = quantity;
		this.description = description;
		this.image = image;
	}
	

}
