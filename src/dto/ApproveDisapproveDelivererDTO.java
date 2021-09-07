package dto;

public class ApproveDisapproveDelivererDTO {
	public String id;
	public String deliverer;
	public ApproveDisapproveDelivererDTO(String id, String deliverer) {
		super();
		this.id = id;
		this.deliverer = deliverer;
	}
	public ApproveDisapproveDelivererDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDeliverer() {
		return deliverer;
	}
	public void setDeliverer(String deliverer) {
		this.deliverer = deliverer;
	}
	@Override
	public String toString() {
		return "ApproveDisapproveDelivererDTO [id=" + id + ", deliverer=" + deliverer + "]";
	}

}
