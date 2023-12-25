package webapp;

import java.io.IOException;

import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.ext.WriterInterceptor;
import jakarta.ws.rs.ext.WriterInterceptorContext;

@Provider
public class CorsFilter implements ContainerResponseFilter {

  @Override
  public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
      throws IOException {
    responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
    responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
    responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
    responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    responseContext.getHeaders().add("Access-Control-Max-Age", "1209600");
  }

}
