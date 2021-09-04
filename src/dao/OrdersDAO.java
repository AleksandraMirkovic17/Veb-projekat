package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Order;
import dao.OrdersDAO;

public class OrdersDAO {

	private String path = "data/orders.json";
	private ArrayList<Order> Orders = new ArrayList<>();
	public static OrdersDAO OrderDAO = null;
	
	private OrdersDAO() {}
	
	public static OrdersDAO getInstance() {
		if(OrderDAO == null) {
			OrderDAO = new OrdersDAO();
		}
		return OrderDAO;
	}
    
	public void addOrder(Order newOrder) {
		readOrders();
		this.Orders.add(newOrder);
		saveAll();
	}
   public void readOrders(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(path));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type Ordersarray = new TypeToken<ArrayList<Order>>(){}.getType();
			Gson gson = new Gson();
				
			Orders = gson.fromJson(json, Ordersarray);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

	private void saveAll() {
		Gson gson = new Gson();
		String json = gson.toJson(this.Orders);
		try(PrintWriter out = new PrintWriter(path)){
			out.println(json);
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}
	public void addAll(ArrayList<Order> newListOfOrders)
	{
		this.Orders = newListOfOrders;
		saveAll();
	}
	
	public ArrayList<Order> getAllOrders(){
		readOrders();
		return Orders;
	}
	
	public void changeOrder(String name, Order changedOrder) {
		ArrayList<Order> allOrders = getAllOrders();
		for(int i=0; i<allOrders.size(); i++) {
			if(allOrders.get(i).getId().equals(name)) {
				allOrders.set(i, changedOrder);
			}
		}
		this.Orders = allOrders;
		saveAll();
		
	}
}
