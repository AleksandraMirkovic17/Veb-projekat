package beans;

import java.util.ArrayList;
import java.util.Date;

public class Order {
	public String id;
	public ArrayList<ShoppingChartItem> articles;
	public Restaurant restaurant;
	public Date dateOfOrder;
	public double price;
	public String customerName;
	public OrderState orderState;
	
	public Order(String id, ArrayList<ShoppingChartItem> articles, Restaurant restaurant, Date dateOfOrder,
			double price, String customerName, OrderState orderState) {
		super();
		this.id = id;
		this.articles = articles;
		this.restaurant = restaurant;
		this.dateOfOrder = dateOfOrder;
		this.price = price;
		this.customerName = customerName;
		this.orderState = orderState;
	}
	public ArrayList<ShoppingChartItem> getArticles() {
		return articles;
	}
	public void setArticles(ArrayList<ShoppingChartItem> articles) {
		this.articles = articles;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getDateOfOrder() {
		return dateOfOrder;
	}
	public void setDateOfOrder(Date dateOfOrder) {
		this.dateOfOrder = dateOfOrder;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public OrderState getOrderState() {
		return orderState;
	}
	public void setOrderState(OrderState orderState) {
		this.orderState = orderState;
	}
	

}
