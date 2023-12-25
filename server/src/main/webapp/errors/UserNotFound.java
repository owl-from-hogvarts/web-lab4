package webapp.errors;

public class UserNotFound extends AuthError {
  public UserNotFound(String login) {
    super(login, "user with such login does not exists");
  }  
}
