package beans;

import java.util.ArrayList;

public class OrderCompeting {
	public String orderId;
	public ArrayList<String> deliverers;
	public OrderCompeting(String orderId) {
		super();
		this.orderId = orderId;
		this.deliverers = new ArrayList<String>();
	}
	public OrderCompeting() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public ArrayList<String> getDeliverers() {
		return deliverers;
	}
	public void setDeliverers(ArrayList<String> deliverers) {
		this.deliverers = deliverers;
	}
	

}
