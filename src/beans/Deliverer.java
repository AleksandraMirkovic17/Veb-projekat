package beans;

import java.util.ArrayList;
import java.util.Date;

import beans.User.Roles;

public class Deliverer extends User{
	public Deliverer(String userName, String password, String name, String surname, Date date) {
		super(userName, password, name, surname, date);
		// TODO Auto-generated constructor stub
		Roles role=Roles.Deliverer;
	}

	public ArrayList<Order> ordersToBeDelivered;
	

	public ArrayList<Order> getOrdersToBeDelivered() {
		return ordersToBeDelivered;
	}

	public void setOrdersToBeDelivered(ArrayList<Order> ordersToBeDelivered) {
		this.ordersToBeDelivered = ordersToBeDelivered;
	}
}
