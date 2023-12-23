package webapp.data;

import webapp.errors.ParamException;

public class JsonResponse {
  
  private final boolean isError;
  
  public JsonResponse(ParamException error) {
    this.isError = true;
  }
  
}
