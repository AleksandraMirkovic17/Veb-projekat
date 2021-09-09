package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Comment;
import dao.CommentDAO;

public class CommentDAO {

	private String path = "data/comments.json";
	private ArrayList<Comment> comments = new ArrayList<>();
	public static CommentDAO commentDAO = null;
	
	private CommentDAO() {}
	
	public static CommentDAO getInstance() {
		if(commentDAO == null) {
			commentDAO = new CommentDAO();
		}
		return commentDAO;
	}
    
	public void addComment(Comment newComment) {
		readComments();
		this.comments.add(newComment);
		saveAll();
	}
   public void readComments(){
		
		BufferedReader reader;
		try {
			
			reader = new BufferedReader(new FileReader(path));
		    String json = reader.readLine();
		    reader.close();
		    
			java.lang.reflect.Type Commentsarray = new TypeToken<ArrayList<Comment>>(){}.getType();
			Gson gson = new Gson();
				
			comments = gson.fromJson(json, Commentsarray);
		     
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

	private void saveAll() {
		Gson gson = new Gson();
		String json = gson.toJson(this.comments);
		try(PrintWriter out = new PrintWriter(path)){
			out.println(json);
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}
	public void addAll(ArrayList<Comment> newListOfComments)
	{
		this.comments = newListOfComments;
		saveAll();
	}
	
	public ArrayList<Comment> getAllComments(){
		readComments();
		return this.comments;
	}
	public void deleteComment(String id) {
		ArrayList<Comment> allComments = getAllComments();
		for(int i=0; i<allComments.size(); i++) {
			if(allComments.get(i).getOrderId().equals(id)) {
				allComments.remove(i);
				break;
			}
		}
		this.comments = allComments;
		saveAll();
	}
	
	public void changeComment(String id, Comment changedComment) {
		ArrayList<Comment> allComments = getAllComments();
		for(int i=0; i<allComments.size(); i++) {
			if(allComments.get(i).getOrderId().equals(id)) {
				allComments.set(i, changedComment);
				break;
			}
		}
		this.comments = allComments;
		saveAll();
		
	}
}

