package beans;

import javax.swing.ImageIcon;

public class Artical {
	
	public String nameArtical;
	public double price;
	//public enum Type{DISH, DRINK};
	//public Type typeArtical;
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
	/*public Type getTypeArtical() {
		return typeArtical;
	}
	public void setTypeArtical(Type typeArtical) {
		this.typeArtical = typeArtical;
	}*/
	
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
