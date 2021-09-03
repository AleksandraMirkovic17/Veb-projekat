package dto;

public class AddItemToChartDTO {
	public String restaurant;
	public String username;
	public String quantity;
	public String nameArtical;
	@Override
	public String toString() {
		return "AddItemToChartDTO [restaurant=" + restaurant + ", username=" + username + ", quantity=" + quantity
				+ ", nameArtical=" + nameArtical + "]";
	}

}
