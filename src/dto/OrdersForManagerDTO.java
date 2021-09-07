package dto;

import java.util.ArrayList;

import beans.Order;
import beans.User;

public class OrdersForManagerDTO {
	public Order order;
	public ArrayList<User> competingdeliverers;
	public OrdersForManagerDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OrdersForManagerDTO(Order order) {
		super();
		this.order = order;
		this.competingdeliverers = new ArrayList<User>();
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	public ArrayList<User> getCompetingdeliverers() {
		return competingdeliverers;
	}
	public void setCompetingdeliverers(ArrayList<User> competingdeliverers) {
		this.competingdeliverers = competingdeliverers;
	}
	

}
