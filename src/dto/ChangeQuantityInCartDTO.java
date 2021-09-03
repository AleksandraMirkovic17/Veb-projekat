package dto;

public class ChangeQuantityInCartDTO {
	public String username;
	public String articalname;
	public String restaurantname;
	public int quantity;
	@Override
	public String toString() {
		return "ChangeQuantityInCartDTO [username=" + username + ", articalname=" + articalname + ", restaurantname="
				+ restaurantname + ", quantity=" + quantity + "]";
	}
}
