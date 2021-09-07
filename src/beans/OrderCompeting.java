package beans;

import java.util.ArrayList;

public class OrderCompeting {
	public String orderId;
	public ArrayList<String> deliverers;
	public ArrayList<String> disapproveddeliverers;
	public OrderCompeting(String orderId) {
		super();
		this.orderId = orderId;
		this.deliverers = new ArrayList<String>();
		this.disapproveddeliverers = new ArrayList<>();
	}
	public OrderCompeting() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ArrayList<String> getDisapproveddeliverers() {
		return disapproveddeliverers;
	}
	public void setDisapproveddeliverers(ArrayList<String> disapproveddeliverers) {
		this.disapproveddeliverers = disapproveddeliverers;
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
