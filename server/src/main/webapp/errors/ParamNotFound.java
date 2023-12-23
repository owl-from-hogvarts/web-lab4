package webapp.errors;

public class ParamNotFound extends ParamException {

  public ParamNotFound(String paramName) {
    super(paramName, "Parameter is required and not supplied!");
  }
  
}
