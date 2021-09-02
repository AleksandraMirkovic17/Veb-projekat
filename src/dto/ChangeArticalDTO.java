package dto;

import beans.Artical.ArticalType;

public class ChangeArticalDTO {
	public String oldNameArtical;
	public String newNameArtical;
	public String price;
	public ArticalType type;
	public String restaurant;
	public String quantity;
	public String description;
	public String oldImage;
	public String newImage;
	@Override
	public String toString() {
		return "ChangeArticalDTO [oldNameArtical=" + oldNameArtical + ", newNameArtical=" + newNameArtical + ", price="
				+ price + ", type=" + type + ", restaurant=" + restaurant + ", qunatity=" + quantity + ", description="
				+ description + ", oldImage=" + oldImage + ", newImage=  ]";
	}

}
