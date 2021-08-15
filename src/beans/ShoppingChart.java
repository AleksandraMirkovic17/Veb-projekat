package beans;

import java.util.ArrayList;

public class ShoppingChart {
	public ArrayList<ShoppingChartItem> items;
	public User user;
	public double price;
	
	public ShoppingChart(User user) {
		super();
		this.items = new ArrayList<ShoppingChartItem>();
		this.user = user;
		this.price=0;
	
	}
	public ShoppingChart() {
		// TODO Auto-generated constructor stub
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
