package dto;

public class CommentDTO {
	public String orderID;
	public String restaurant;
	public String username;
	public int rate;
	public String comment;
	public CommentDTO(String orderID, String restaurant, String username, int rate, String comment) {
		super();
		this.orderID = orderID;
		this.restaurant = restaurant;
		this.username = username;
		this.rate = rate;
		this.comment = comment;
	}
	public CommentDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getOrderID() {
		return orderID;
	}
	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
	public String getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getRate() {
		return rate;
	}
	public void setRate(int rate) {
		this.rate = rate;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	@Override
	public String toString() {
		return "CommentDTO [orderID=" + orderID + ", restaurant=" + restaurant + ", username=" + username + ", rate="
				+ rate + ", comment=" + comment + "]";
	}
	
}
