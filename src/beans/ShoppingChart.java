package beans;

import java.util.ArrayList;

public class ShoppingChart {
	public ArrayList<ShoppingChartItem> items;
	public User user;
	public double price;
	
	public ShoppingChart(ArrayList<ShoppingChartItem> items, User user, double price) {
		super();
		this.items = items;
		this.user = user;
		this.price = price;
	}
	public ArrayList<ShoppingChartItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<ShoppingChartItem> items) {
		this.items = items;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
}
