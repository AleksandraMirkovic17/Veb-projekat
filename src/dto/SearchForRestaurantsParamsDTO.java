package dto;

public class SearchForRestaurantsParamsDTO {
	public String name;
	public String location;
	public String rating;
	public String type;
	public String onlyopened;
	
	public SearchForRestaurantsParamsDTO(String name, String location, String rating, String type, String onlyopened) {
		super();
		this.name = name;
		this.location = location;
		this.rating = rating;
		this.type = type;
		this.onlyopened = onlyopened;
	}
}
