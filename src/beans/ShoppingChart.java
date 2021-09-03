package beans;

import java.util.ArrayList;

public class ShoppingChart {
	public ArrayList<ShoppingChartItem> items;
	public String username;
	public double price;
	
	public ShoppingChart(String username) {
		super();
		this.items = new ArrayList<ShoppingChartItem>();
		this.username = username;
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
	public String getUsername() {
		return username;
	}
	public void setUser(String username) {
		this.username = username;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
}
