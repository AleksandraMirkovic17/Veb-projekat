package beans;

public class CustomerType {
	public String typeName;
	public double discountPercentage;
	public int requiredScore;
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public double getDiscountPercentage() {
		return discountPercentage;
	}
	public void setDiscountPercentage(double discountPercentage) {
		this.discountPercentage = discountPercentage;
	}
	public int getRequiredScore() {
		return requiredScore;
	}
	public void setRequiredScore(int requiredScore) {
		this.requiredScore = requiredScore;
	}
}
