package service;

import java.io.BufferedReader;

import java.util.UUID;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Order;
import beans.OrderCompeting;
import beans.OrderState;
import beans.ShoppingChart;
import beans.ShoppingChartItem;
import beans.User;
import dao.OrderCompetingDAO;
import dao.OrdersDAO;
import dto.CompeteToDeliverDTO;

public class OrderCompetingService {
	
	public static OrderCompetingService OrderCompetingService = null;
	public static OrderCompetingService getInstance() {
		if(OrderCompetingService == null) {
			OrderCompetingService = new OrderCompetingService();
		}
		return OrderCompetingService;
	}
	private OrderCompetingService() {
		
	}
	public boolean isDelivererCompeted(String username, String id) {
		boolean ret = false;
		OrderCompeting oc = getById(id);
		for(String s : oc.getDeliverers()) {
			if(s.equals(username)) {
				ret= true;
			}
		}
		return ret;
	}
	
	public OrderCompeting getById(String id) {
		ArrayList<OrderCompeting> allCompeting = OrderCompetingDAO.getInstance().getAllOrderCompetings();
		OrderCompeting ret = null;
		for(OrderCompeting oc : allCompeting) {
			if(oc.getOrderId().equals(id)) {
				ret = oc;
				break;
			}
		}
		if(ret == null) {
			ret = new OrderCompeting(id);
			OrderCompetingDAO.getInstance().addOrderCompeting(ret);
		}
		return ret;
	}
	public void addDeliverToOrder(CompeteToDeliverDTO params) {
		OrderCompeting oc = getById(params.id);
		if(!isDelivererCompeted(params.username, params.id)) {
			oc.deliverers.add(params.username);
		}
		OrderCompetingDAO.getInstance().changeOrderCompeting(params.id, oc);		
	}


}