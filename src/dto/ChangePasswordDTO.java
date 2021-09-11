package dto;

public class ChangePasswordDTO {
	public String username;
	public String oldpassword;
	public String newpassword;
	public String repeatedpassword;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getOldpassword() {
		return oldpassword;
	}
	public void setOldpassword(String oldpassword) {
		this.oldpassword = oldpassword;
	}
	public String getNewpassword() {
		return newpassword;
	}
	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}
	public String getRepeatedpassword() {
		return repeatedpassword;
	}
	public void setRepeatedpassword(String repeatedpassword) {
		this.repeatedpassword = repeatedpassword;
	}
	public ChangePasswordDTO(String username, String oldpassword, String newpassword, String repeatedpassword) {
		super();
		this.username = username;
		this.oldpassword = oldpassword;
		this.newpassword = newpassword;
		this.repeatedpassword = repeatedpassword;
	}
	@Override
	public String toString() {
		return "ChangePasswordDTO [username=" + username + ", oldpassword=" + oldpassword + ", newpassword="
				+ newpassword + ", repeatedpassword=" + repeatedpassword + "]";
	}
	
}
