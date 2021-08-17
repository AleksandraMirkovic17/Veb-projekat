package beans;

import java.util.ArrayList;

public class Location {
   
	public String logitude;
	public String latitude;
	public String street;
	public String houseNumber;
	public String city;
	public String postalCode;
	
	public Location() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Location(String logitude, String latitude, String street, String houseNumber, String city,
			String postalCode) {
		super();
		this.logitude = logitude;
		this.latitude = latitude;
		this.street = street;
		this.houseNumber = houseNumber;
		this.city = city;
		this.postalCode = postalCode;
	}

	public String getLogitude() {
		return logitude;
	}

	public void setLogitude(String logitude) {
		this.logitude = logitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	
}
