package dto;

import beans.Artical.ArticalType;

public class AddingArticalToRestaurantDTO {
	public String nameArtical;
	public double price;
	public ArticalType type;
	public String restaurant;
	public String quantity;
	public String description;
	public String image;
	@Override
	public String toString() {
		return "AddingArticalToRestaurantDTO [nameArtical=" + nameArtical + ", price=" + price + ", type=" + type
				+ ", restaurant=" + restaurant + ", quantity=" + quantity + ", description=" + description + ", image="
				+ image + "]";
	}
	

}
