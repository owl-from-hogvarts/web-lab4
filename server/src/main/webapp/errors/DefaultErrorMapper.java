package webapp.errors;

import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.ext.Providers;

@Provider
public class DefaultErrorMapper implements ExceptionMapper<Exception> {
  @Context
  private Providers providers;

  public Response toResponse(Exception exception) {
    if (exception instanceof WebApplicationException) {
      // suggested by chat gpt
      // exception mapper injection with @Inject does not work

      // rethrow exception also does not work.
      // WebApplicationException is instance of RuntimeException
      // therefore internal server error is generated 
      // according to jax rs specs
      final var mapper = providers.getExceptionMapper(Throwable.class);
      return mapper.toResponse((WebApplicationException) exception);
    }
    return Response.ok(new UnknownError(exception.getMessage())).status(400).build();
  }

}
