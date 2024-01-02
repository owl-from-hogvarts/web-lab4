package webapp.errors;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ErrorMapper implements ExceptionMapper<ParamException> {

  @Override
  public Response toResponse(ParamException exception) {
    return Response.ok(exception).status(422).build();
  }
  
}
