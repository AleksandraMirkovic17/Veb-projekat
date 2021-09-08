package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import beans.ShoppingChart;
import service.ShoppingChartService;

public class ShoppingChartDAO {
	private String path = "data/shoppingcharts.json";
	private ArrayList<ShoppingChart> shoppingCharts = new ArrayList<>();
	public static ShoppingChartDAO shoppingChartDAO = null;
	
	private ShoppingChartDAO() {}
	
	public static ShoppingChartDAO getInstance() {
		if(shoppingChartDAO == null) {
			shoppingChartDAO = new ShoppingChartDAO();
		}
		return shoppingChartDAO;
	}
    
	public void addShoppingChart(ShoppingChart newShoppingChart) {
		this.shoppingCharts.add(newShoppingChart);
		saveAll();
	}
   public void readShoppingCharts(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(path));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type shoppingchartsarray = new TypeToken<ArrayList<ShoppingChart>>(){}.getType();
			Gson gson = new Gson();
				
			shoppingCharts = gson.fromJson(json, shoppingchartsarray);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

	private void saveAll() {
		Gson gson = new Gson();
		String json = gson.toJson(this.shoppingCharts);
		try(PrintWriter out = new PrintWriter(path)){
			out.println(json);
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}
	public void addAll(ArrayList<ShoppingChart> newListOfShoppingChart)
	{
		this.shoppingCharts = newListOfShoppingChart;
		saveAll();
	}
	public ArrayList<ShoppingChart> getAllShoppingCharts(){
		readShoppingCharts();
		return shoppingCharts;
	}
	
	public ShoppingChart getByUsername(String username) {
		ShoppingChart ret = null;
		ArrayList<ShoppingChart> allShoppingCharts = getAllShoppingCharts();
		for(ShoppingChart sc : allShoppingCharts) {
			if(sc.getUsername().equals(username)) {
				ret = sc;
				break;
			}
		}
		if(ret == null) {
			ret = ShoppingChartService.getInstance().addNewShoppingChart(username);
		}
		return ret;
	}
	
	public void changeShoppingChart(String username, ShoppingChart changedShoppingChart) {
		ArrayList<ShoppingChart> allShoppingCharts = getAllShoppingCharts();
		for(int i=0; i<allShoppingCharts.size(); i++) {
			if(allShoppingCharts.get(i).getUsername().equals(username)) {
				allShoppingCharts.set(i, changedShoppingChart);
			}
		}
		this.shoppingCharts = allShoppingCharts;
		saveAll();		
	}
}
