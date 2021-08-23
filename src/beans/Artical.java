package beans;


public class Artical {
	
	public String nameArtical;
	public double price;
	public enum ArticalType{DISH, DRINK};
	public ArticalType type;
	public String restaurant;
	public double quantity;
	public String description;
	public String image;
	
	public Artical() {
		super();
		// TODO Auto-generated constructor stub
	}
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
	public Artical(String nameArtical, double price, ArticalType type, String restaurant, double quantity,
			String description, String image) {
		super();
		this.nameArtical = nameArtical;
		this.price = price;
		this.type = type;
		this.restaurant = restaurant;
		this.quantity = quantity;
		this.description = description;
		this.image = image;
	}
	public ArticalType getType() {
		return type;
	}
	public void setType(ArticalType type) {
		this.type = type;
	}
	public String getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(String restaurant) {
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
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Artical(String nameArtical, double price, double quantity,
			String description, String image) {
		super();
		this.nameArtical = nameArtical;
		this.price = price;
		//this.typeArtical = typeArtical;
		this.quantity = quantity;
		this.description = description;
		this.image = image;
	}
	

}
