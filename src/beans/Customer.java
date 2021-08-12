package beans;

import java.util.ArrayList;

public class Customer extends User{
	public ArrayList<Order> allOrders;
	public ShoppingChart shoppingChart;
	public int score;
	
	public ArrayList<Order> getAllOrders() {
		return allOrders;
	}
	public void setAllOrders(ArrayList<Order> allOrders) {
		this.allOrders = allOrders;
	}
	public ShoppingChart getShoppingChart() {
		return shoppingChart;
	}
	public void setShoppingChart(ShoppingChart shoppingChart) {
		this.shoppingChart = shoppingChart;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	
}
