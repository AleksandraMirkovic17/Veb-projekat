package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.OrderCompeting;
import dao.OrderCompetingDAO;

public class OrderCompetingDAO {

	private String path = "data/ordercompeting.json";
	private ArrayList<OrderCompeting> ordercompetings = new ArrayList<>();
	public static OrderCompetingDAO OrderCompetingDAO = null;
	
	private OrderCompetingDAO() {}
	
	public static OrderCompetingDAO getInstance() {
		if(OrderCompetingDAO == null) {
			OrderCompetingDAO = new OrderCompetingDAO();
		}
		return OrderCompetingDAO;
	}
    
	public void addOrderCompeting(OrderCompeting newOrderCompeting) {
		readOrderCompetings();
		this.ordercompetings.add(newOrderCompeting);
		saveAll();
	}
   public void readOrderCompetings(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(path));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type OrderCompetingsarray = new TypeToken<ArrayList<OrderCompeting>>(){}.getType();
			Gson gson = new Gson();
				
			ordercompetings = gson.fromJson(json, OrderCompetingsarray);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

	private void saveAll() {
		Gson gson = new Gson();
		String json = gson.toJson(this.ordercompetings);
		try(PrintWriter out = new PrintWriter(path)){
			out.println(json);
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}
	public void addAll(ArrayList<OrderCompeting> newListOfOrderCompetings)
	{
		this.ordercompetings = newListOfOrderCompetings;
		saveAll();
	}
	
	public ArrayList<OrderCompeting> getAllOrderCompetings(){
		readOrderCompetings();
		return this.ordercompetings;
	}
	
	public void changeOrderCompeting(String name, OrderCompeting changedOrderCompeting) {
		ArrayList<OrderCompeting> allOrderCompetings = getAllOrderCompetings();
		for(int i=0; i<allOrderCompetings.size(); i++) {
			if(allOrderCompetings.get(i).getOrderId().equals(name)) {
				allOrderCompetings.set(i, changedOrderCompeting);
			}
		}
		this.ordercompetings = allOrderCompetings;
		saveAll();
		
	}
}
