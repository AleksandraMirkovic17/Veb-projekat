package beans;

public class ShoppingChartItem {
	public Artical artical;
	public int quantity;
	public ShoppingChartItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ShoppingChartItem(Artical artical, int quantity) {
		super();
		this.artical = artical;
		this.quantity = quantity;
	}
	public Artical getArtical() {
		return artical;
	}
	public void setArtical(Artical artical) {
		this.artical = artical;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
