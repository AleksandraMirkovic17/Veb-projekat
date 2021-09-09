package beans;

import java.util.ArrayList;
import java.util.Date;

public class Order {
	public String id;
	public ArrayList<ShoppingChartItem> articles;
	public String restaurant;
	public String date;
	public double price;
	public double priceWithDiscount;
	public String fullName;
	public String username;
	public String deliverer;
	public Boolean commented;
	public OrderState orderState;
	public Order(String id, ArrayList<ShoppingChartItem> articles, String restaurant, String date, double price,
			double priceWithDiscount, String fullName, String username, String deliverer, OrderState orderState) {
		super();
		this.id = id;
		this.articles = articles;
		this.restaurant = restaurant;
		this.date = date;
		this.price = price;
		this.priceWithDiscount = priceWithDiscount;
		this.fullName = fullName;
		this.username = username;
		this.deliverer = deliverer;
		this.orderState = orderState;
		this.commented = false;
	}
	public Boolean getCommented() {
		return commented;
	}
	public void setCommented(Boolean commented) {
		this.commented = commented;
	}
	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ArrayList<ShoppingChartItem> getArticles() {
		return articles;
	}
	public void setArticles(ArrayList<ShoppingChartItem> articles) {
		this.articles = articles;
	}
	public String getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(String string) {
		this.restaurant = string;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getPriceWithDiscount() {
		return priceWithDiscount;
	}
	public void setPriceWithDiscount(double priceWithDiscount) {
		this.priceWithDiscount = priceWithDiscount;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getDeliverer() {
		return deliverer;
	}
	public void setDeliverer(String deliverer) {
		this.deliverer = deliverer;
	}
	public OrderState getOrderState() {
		return orderState;
	}
	public void setOrderState(OrderState orderState) {
		this.orderState = orderState;
	}
	@Override
	public String toString() {
		return "Order [id=" + id + ", articles=" + articles + ", restaurant=" + restaurant + ", date=" + date
				+ ", price=" + price + ", priceWithDiscount=" + priceWithDiscount + ", fullName=" + fullName
				+ ", username=" + username + ", deliverer=" + deliverer + ", orderState=" + orderState + "]";
	}
	
	
	
	

}
