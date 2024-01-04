package webapp.errors;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class KnownErrorMapper implements ExceptionMapper<JsonError> {

  @Override
  public Response toResponse(JsonError exception) {
    return Response.ok(exception).status(422).build();
  }
  
}
