package beans;

import java.util.ArrayList;

public class Deliverer extends User{
	public ArrayList<Order> ordersToBeDelivered;
	

	public Deliverer() {
		super();
		
	}

	public ArrayList<Order> getOrdersToBeDelivered() {
		return ordersToBeDelivered;
	}

	public void setOrdersToBeDelivered(ArrayList<Order> ordersToBeDelivered) {
		this.ordersToBeDelivered = ordersToBeDelivered;
	}
}
