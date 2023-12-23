package webapp;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/app")
public class ControllerServlet extends HttpServlet {
  private static final String PARAM_IS_JSON = "isJson";

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // if req contains params and isJson, pass to areaCheck
    final boolean isJson = req.getParameter(PARAM_IS_JSON) != null;

    if (isJson) {
      if (any(req, AreaCheckServlet.getRequiredParams())) {
        req.getRequestDispatcher("WEB-INF/areaCheck").forward(req, resp);
        return;
      }

      req.getRequestDispatcher("WEB-INF/getPoints").forward(req, resp);
      return;
    }
    req.getRequestDispatcher("/WEB-INF/index.jsp").forward(req, resp);
  }

  private boolean any(HttpServletRequest req, String... paramNames) {
    for (final String name : paramNames) {
      if (req.getParameter(name) != null) {
        return true;
      }
    }

    return false;
  }

}
