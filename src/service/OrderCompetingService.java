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
import dto.ApproveDisapproveDelivererDTO;
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
	public void approveDeliverer(ApproveDisapproveDelivererDTO params) {
		OrderCompetingDAO.getInstance().deleteOrderCompeting(params.id);
		OrderService.getInstance().addDelivererToOrder(params);
	}
	public void disapproveDeliverer(ApproveDisapproveDelivererDTO params) {
		OrderCompeting oc = getById(params.id);
		oc.disapproveddeliverers.add(params.deliverer);
		OrderCompetingDAO.getInstance().changeOrderCompeting(params.id, oc);	
	}
	public void changeDelivererName(String oldUsername, User newUser) {
		changeDelivererInCometings(oldUsername, newUser);
		changeDelivererInDisapprovedCompetings(oldUsername, newUser);		
	}
	
	private void changeDelivererInDisapprovedCompetings(String oldUsername, User newUser) {
		ArrayList<OrderCompeting> delivererDisapprovedCompetings = getDelivererDisapprovedCompetings(oldUsername);
		for(OrderCompeting oc : delivererDisapprovedCompetings) {
			for(int i=0; i<oc.getDisapproveddeliverers().size(); i++) {
				if(oc.getDisapproveddeliverers().get(i).equals(oldUsername)) {
					ArrayList<String> oldDisapprovedDeliverers = oc.getDisapproveddeliverers();
					oldDisapprovedDeliverers.set(i, newUser.getUserName());
					oc.setDisapproveddeliverers(oldDisapprovedDeliverers);
					OrderCompetingDAO.getInstance().changeOrderCompeting(oc.getOrderId(), oc);
					break;
				}
			}
		}
		
	}
	private void changeDelivererInCometings(String oldUsername, User newUser) {
		ArrayList<OrderCompeting> deliverersCompetings = getDeliverersComepings(oldUsername);
		for(OrderCompeting oc : deliverersCompetings) {
			for(int i= 0; i<oc.getDeliverers().size(); i++) {
				if(oc.getDeliverers().get(i).equals(oldUsername)) {
					ArrayList<String> oldDeliverers = oc.getDeliverers();
					oldDeliverers.set(i, newUser.getUserName());
					oc.setDeliverers(oldDeliverers);
					OrderCompetingDAO.getInstance().changeOrderCompeting(oc.getOrderId(), oc);
					break;
				}
			}
		}
		
	}
	private ArrayList<OrderCompeting> getDelivererDisapprovedCompetings(String userName) {
		ArrayList<OrderCompeting> allCompetings = OrderCompetingDAO.getInstance().getAllOrderCompetings();
		ArrayList<OrderCompeting> deliverersCompetings = new ArrayList<OrderCompeting>();
		for(OrderCompeting oc : allCompetings) {
			for(String s : oc.getDisapproveddeliverers()) {
				if(s.equals(userName)) {
					deliverersCompetings.add(oc);
					break;
				}
			}
		}
		return deliverersCompetings;
	}
	private ArrayList<OrderCompeting> getDeliverersComepings(String userName) {
		ArrayList<OrderCompeting> allCompetings = OrderCompetingDAO.getInstance().getAllOrderCompetings();
		ArrayList<OrderCompeting> deliverersCompetings = new ArrayList<OrderCompeting>();
		for(OrderCompeting oc : allCompetings) {
			for(String s : oc.getDeliverers()) {
				System.out.println("Order "+oc.getOrderId()+" competitors "+oc.getDeliverers());
				if(s.equals(userName)) {
					deliverersCompetings.add(oc);
					break;
				}
			}
		}
		System.out.println("The deliverer"+userName+ "that is changing his username competed for "+deliverersCompetings.size()+" deliveries!");
		return deliverersCompetings;
	}


}
