package webapp.errors;

public class WrongPassword extends AuthError {
  public WrongPassword(String login) {
    super(login, "wrong password provided");
  }

  @Override
  public String getErrorType() {
    return super.getErrorType() + "wrong-password/";
  }
}
