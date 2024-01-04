package webapp.errors;

public class UserNotFound extends AuthError {
  public UserNotFound(String login) {
    super(login, "user with such login does not exists");
  }

  @Override
  public String getErrorType() {
    return super.getErrorType() + "user-not-found/";
  }  
}
