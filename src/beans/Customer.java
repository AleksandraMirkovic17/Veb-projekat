package beans;

import java.util.ArrayList;
import java.util.Date;

public class Customer extends User{
	public ArrayList<Order> allOrders;
	public ShoppingChart shoppingChart;
	public int score;
	public Customer(String userName, String password, String name, String surname, Date date) {
		super(userName, password, name, surname, date);
		// TODO Auto-generated constructor stub
		Roles role=Roles.Customer;
		this.allOrders=new ArrayList<Order>();
		
	
	}
	
	
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
