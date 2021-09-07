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
import com.google.gson.JsonElement;
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
import dto.OrdersForManagerDTO;

public class OrderService {
	public static OrdersDAO ordersDAO=new OrdersDAO();
	public static OrderService orderService = null;
	public static OrderService getInstance() {
		if(orderService == null) {
			orderService = new OrderService();
		}
		return orderService;
	}
	public OrderService() {
		
	}
	public void makeAnOrder(String username) {
		User user = UserService.getInstance().getByUsername(username);
		ShoppingChart sc = ShoppingChartService.getInstance().getByUsername(username);
		HashMap<String, Order> orders = new HashMap<>();
		for(ShoppingChartItem si : sc.items) {
			if(orders.containsKey(si.artical.restaurant)) {
				Order newOrder = orders.get(si.artical.restaurant);
				newOrder.articles.add(si);
				orders.put(si.artical.restaurant, newOrder);
				
			}else {
				Order newOrder = new Order();
				newOrder.setId(UUID.randomUUID().toString());
				OrderCompeting oc = new OrderCompeting(newOrder.getId());
				OrderCompetingDAO.getInstance().addOrderCompeting(oc);
				ArrayList<ShoppingChartItem> articles = new ArrayList<>();
				articles.add(si);
				newOrder.setArticles(articles);
				LocalDateTime now = LocalDateTime.now();
				newOrder.setDate(now.toString());
				newOrder.setFullName(user.getName()+' '+user.getSurname());
				newOrder.setUsername(username);
				newOrder.setOrderState(OrderState.PROCESSING);
				newOrder.setRestaurant(si.getArtical().getRestaurant());
				orders.put(si.artical.restaurant, newOrder);
			}
		}
		orders.forEach((k, v) -> {
		    CalculateAndSaveOrder(v, user.discount);
		});
		ShoppingChartService.getInstance().emptyShoppingCart(username);	
		
		}
	
	private void CalculateAndSaveOrder(Order v, double discount) {
		double price = 0.0;
		for(ShoppingChartItem si : v.articles) {
			price+= si.artical.price * si.quantity;	
	}
		double priceDiscounted = price * ((100-discount)/100);
		v.setPrice(price);
		v.setPriceWithDiscount(priceDiscounted);
		OrdersDAO.getInstance().addOrder(v);
	}

	public ArrayList<Order> getOrders(User user)
	{
		ArrayList<Order> orders=ordersDAO.getAllOrders();
		ArrayList<Order> userOrders=new ArrayList<>();
		
		for(Order o:orders)
		{
			if(o.username.equals(user.userName))
			{
				userOrders.add(o);
			}
				
		}
		return userOrders;
	}
	

	public ArrayList<Order> getByRestaurant(String restaurant){
		ArrayList<Order> restaurantsOrders = new ArrayList<Order>();
		ArrayList<Order> allOrders = OrdersDAO.getInstance().getAllOrders();
		for(Order o : allOrders) {
			if(o.getRestaurant().equals(restaurant)) {
				restaurantsOrders.add(o);
			}
		}		
		return restaurantsOrders;
	}
	
	public ArrayList<Order> getByCustomer(String username){
		ArrayList<Order> customersOrders = new ArrayList<Order>();
		ArrayList<Order> allOrders = OrdersDAO.getInstance().getAllOrders();
		for(Order o : allOrders) {
			if(o.getUsername().equals(username)) {
				customersOrders.add(o);
			}
		}		
		return customersOrders;
	}
	public void goToNextState(String orderId) {
		Order order = GetById(orderId);
		if(order == null) {
			System.out.println("Ne postoji porudzbina sa prosledjenim Id!");
		}else {
			order.setOrderState(getNextState(order.getOrderState()));
			OrdersDAO.getInstance().changeOrder(orderId, order);
		}
		
	}
	
	private OrderState getNextState(OrderState orderState) {
		OrderState nextState = OrderState.CANCELED;
		if(orderState.equals(OrderState.PROCESSING)) nextState = OrderState.PREPAIRING;
		else if(orderState.equals(OrderState.PREPAIRING)) nextState = OrderState.READYTODELIVER;
		else if(orderState.equals(OrderState.READYTODELIVER)) nextState = OrderState.TRANSPORTING;
		else if(orderState.equals(OrderState.TRANSPORTING)) nextState = OrderState.DELIVERED;
		return nextState;
	}
	public Order GetById(String orderId) {
		// TODO Auto-generated method stub
		Order ret = null;
		ArrayList<Order> allOrders = OrdersDAO.getInstance().getAllOrders();
		for(Order o : allOrders) {
			if(o.getId().equals(orderId)) {
				ret = o;
				break;
			}
		}
		return ret;
	}
	public ArrayList<Order> getReadyOrdersForDeliverer(String username) {
		ArrayList<Order> allOrders = OrdersDAO.getInstance().getAllOrders();
		ArrayList<Order> readyOrders = new ArrayList<Order>();
		for(Order o: allOrders) {
			if(o.getOrderState().equals(OrderState.READYTODELIVER) 
					&& o.getDeliverer()==null
					&& !OrderCompetingService.getInstance().isDelivererCompeted(username, o.getId())) {
				readyOrders.add(o);
			}
		}
		return readyOrders;
	}
	
	public ArrayList<Order> getOrdersByRestaurantsType(String username, String typerequired) {
		ArrayList<Order> orderForDeliverer = getReadyOrdersForDeliverer(username);
		ArrayList<Order> orderByTypeForDeliverer = new ArrayList<Order>();
		for(Order o : orderForDeliverer) {
			if(RestaurantService.getInstance().getRestaurantType(o.getRestaurant()).toString().equals(typerequired)) {
				orderByTypeForDeliverer.add(o);
			}
		}
		return orderByTypeForDeliverer;
	}
	public ArrayList<OrdersForManagerDTO> getOrdersForManager(String restaurantsName) {
		ArrayList<Order> orderForRestaurant = getByRestaurant(restaurantsName);
		ArrayList<OrdersForManagerDTO> orderWithDeliverers = new ArrayList<OrdersForManagerDTO>();
		for(Order o : orderForRestaurant) {
			OrdersForManagerDTO orderManager = new OrdersForManagerDTO(o);
			OrderCompeting oc = OrderCompetingService.getInstance().getById(o.getId());
			if(oc.getDisapproveddeliverers()==null) {
				oc.setDisapproveddeliverers(new ArrayList<String>());
				OrderCompetingDAO.getInstance().changeOrderCompeting(oc.getOrderId(), oc);
			}
			for(String deliverersusername : oc.getDeliverers()){
				if(!delivererDisapproved(deliverersusername, oc.getDisapproveddeliverers())) {
				User user = UserService.getInstance().getByUsername(deliverersusername);
				orderManager.competingdeliverers.add(user);
				}
			}
			orderWithDeliverers.add(orderManager);
		}
		return orderWithDeliverers;
	}
	
	private boolean delivererDisapproved(String deliverersusername, ArrayList<String> disapproveddeliverers) {
		boolean ret = false;
		for(String s : disapproveddeliverers) {
			if(s.equals(deliverersusername)) {
				ret=true;
				break;
			}
		}
		return ret;
	}
	public void addDelivererToOrder(ApproveDisapproveDelivererDTO params) {
		Order o = GetById(params.id);
		o.setDeliverer(params.deliverer);
		o.setOrderState(OrderState.TRANSPORTING);
		OrdersDAO.getInstance().changeOrder(params.id, o);
	}
	
	public ArrayList<Order> getByDeliverer(String username) {
		ArrayList<Order> deliverersOrders = new ArrayList<Order>();
		ArrayList<Order> allOrders = ordersDAO.getAllOrders();
		for(Order o : allOrders) {
			if(o.getDeliverer()!=null && o.getDeliverer().equals(username)) {
				deliverersOrders.add(o);
			}
		}
		return deliverersOrders;
	}
	
	public ArrayList<Order> getOrdersByRestaurantsTypeDeliverer(String username, String typerequired) {
		ArrayList<Order> ordersByRestaurantsTypeDeliverer = new ArrayList<Order>();
		ArrayList<Order> deliverersOrders = getByDeliverer(username);
		for(Order o : deliverersOrders) {
			if(RestaurantService.getInstance().getRestaurantType(o.getRestaurant()).toString().equals(typerequired)) {
				ordersByRestaurantsTypeDeliverer.add(o);
			}
		}		
		return ordersByRestaurantsTypeDeliverer;
	}
	public ArrayList<Order> getOrdersByRestaurantsTypeCustomer(String username, String typerequired) {
		ArrayList<Order> ordersByRestaurantsTypeCustomer = new ArrayList<Order>();
		ArrayList<Order> ordersByRestaurantsCustomer = getByCustomer(username);
		for(Order o : ordersByRestaurantsCustomer) {
			if(RestaurantService.getInstance().getRestaurantType(o.getRestaurant()).toString().equals(typerequired)) {
				ordersByRestaurantsTypeCustomer.add(o);
			}
		}		
		return ordersByRestaurantsTypeCustomer;
	}
	public void cancelOrder(String id) {
		Order o = GetById(id);
		o.setOrderState(OrderState.CANCELED);
		OrdersDAO.getInstance().changeOrder(id, o);
		OrderCompetingDAO.getInstance().deleteOrderCompeting(id);
		
	}


}
