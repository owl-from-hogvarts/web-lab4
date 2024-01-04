package webapp.errors;

public class UserAlreadyExists extends JsonError {

  public UserAlreadyExists(String login) {
    super("Registration Failed! User with login: \"" + login + "\" already exists. Try another login");
  }

  @Override
  public String getErrorType() {
    return super.getErrorType() + "registration/user-already-exists";
  }
  
}
