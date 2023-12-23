package webapp;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/WEB-INF/getPoints")
public class PointsServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    final var userData = PointsHelper.getPointsSafe(req.getSession());
    PointsHelper.objectMapper.writeValue(resp.getWriter(), userData);
    resp.setStatus(501);
  }
  
}
