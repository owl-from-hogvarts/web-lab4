package webapp.errors;

public class WrongPassword extends AuthError {
  public WrongPassword(String login) {
    super(login, "wrong password provided");
  }
}
