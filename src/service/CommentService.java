package service;

import java.util.ArrayList;

import beans.Comment;
import beans.Comment.CommentStatus;
import dao.CommentDAO;
import dto.CommentDTO;
import dto.NextStateDTO;

public class CommentService {
	public static CommentService commentService= null;
	
	public static CommentService getInstance() {
		if(commentService == null) {
			commentService = new CommentService();
		}
		return commentService;
	}
	
	private CommentService() {
		
	}

	public void saveComment(CommentDTO comment) {
		Comment newComment =new Comment(comment.username, comment.restaurant, comment.comment.trim(), comment.rate, comment.orderID);
		CommentDAO.getInstance().addComment(newComment);
		OrderService.getInstance().addComment(comment.orderID);
		RestaurantService.getInstance().calculateRating(comment);
		
	}

	public ArrayList<Comment> getByRestaurant(String restaurant) {
		ArrayList<Comment> allComments = CommentDAO.getInstance().getAllComments();
		ArrayList<Comment> restaurantsComments = new ArrayList<Comment>();
		for(Comment c : allComments) {
			if(c.restaurant.equals(restaurant)) {
				restaurantsComments.add(c);
			}
		}
		return restaurantsComments;
	}
	
	public Comment getByOrderId(String id) {
		Comment ret =null;
		ArrayList<Comment> allComments = CommentDAO.getInstance().getAllComments();
		for(Comment c : allComments) {
			if(c.getOrderId().equals(id)) {
				ret = c;
				break;
			}
		}
		return ret;
	}

	public void approveComment(NextStateDTO id) {
		Comment c = getByOrderId(id.id);
		c.setStatus(CommentStatus.Approved);
		CommentDAO.getInstance().changeComment(id.id, c);		
	}
	
	public void disapproveComment(NextStateDTO id) {
		Comment c = getByOrderId(id.id);
		c.setStatus(CommentStatus.Disapproved);
		CommentDAO.getInstance().changeComment(id.id, c);		
	}

}
