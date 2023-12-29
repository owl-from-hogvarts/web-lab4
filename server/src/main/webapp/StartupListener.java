package webapp;

import jakarta.inject.Inject;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class StartupListener implements ServletContextListener {
    @Inject
    private SessionDAO sessions;

    @Override
    public void contextInitialized(ServletContextEvent event) {
        sessions.cleanupExpiredSessions();
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        sessions.cleanupExpiredSessions();
    }
}
