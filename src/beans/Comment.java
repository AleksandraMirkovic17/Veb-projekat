package beans;

public class Comment {
	public String customer;
	public String restaurant;
	public String text;
	public int mark;
	public String orderId;
	public enum CommentStatus {Waiting, Disapproved, Approved};
	public CommentStatus status;
	
	
	public Comment(String customer, String restaurant, String text, int mark, String orderId) {
		super();
		this.customer = customer;
		this.restaurant = restaurant;
		this.text = text;
		this.mark = mark;
		this.orderId = orderId;
		this.status = CommentStatus.Waiting;
	}
	
	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(CommentStatus status) {
		this.status = status;
	}

	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getMark() {
		return mark;
	}
	public void setMark(int mark) {
		this.mark = mark;
	}
}
