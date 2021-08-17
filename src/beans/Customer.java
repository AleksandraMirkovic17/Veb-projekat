package beans;

import java.util.ArrayList;
import java.util.Date;

public class Customer extends User{
	private ArrayList<Order> allOrders;
	private ShoppingChart shoppingChart;
	private int score;
	

	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public Customer(String userName, String password, String name, String surname, Date date,String gender,Roles role) {
		super(userName, password, name, surname, date,gender,role);
		role=Roles.CUSTOMER;
		allOrders=new ArrayList<Order>();
		shoppingChart=new ShoppingChart();
		this.score = 0;

	}
	
	

	
}
