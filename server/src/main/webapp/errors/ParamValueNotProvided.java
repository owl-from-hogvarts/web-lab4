package webapp.errors;

public class ParamValueNotProvided extends ParamException{

  public ParamValueNotProvided(String paramName) {
    super(paramName, "Parameter supplied, but value was not found!");
  }
  
}
