package webapp;

import java.io.IOException;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;

public class ProtectedEndpointFilter implements ContainerRequestFilter {

  @Override
  public void filter(ContainerRequestContext requestContext) throws IOException {
    final var params = requestContext.getUriInfo().getQueryParameters();
    if (!params.containsKey("user_token")) {
      requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
    }
  }
  
}