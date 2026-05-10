package org.example.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;

@Configuration
public class ServerPortFallbackConfig implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    private static final Logger LOGGER = LoggerFactory.getLogger(ServerPortFallbackConfig.class);
    private static final int MAX_PORT_PROBES = 20;

    private final int configuredPort;

    public ServerPortFallbackConfig(@Value("${server.port:8080}") int configuredPort) {
        this.configuredPort = configuredPort;
    }

    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        int selectedPort = findAvailablePort(configuredPort);
        if (selectedPort != configuredPort) {
            LOGGER.warn("Port {} is busy. Starting backend on fallback port {}.", configuredPort, selectedPort);
        }
        factory.setPort(selectedPort);
    }

    private int findAvailablePort(int preferredPort) {
        for (int i = 0; i <= MAX_PORT_PROBES; i++) {
            int candidate = preferredPort + i;
            if (isPortAvailable(candidate)) {
                return candidate;
            }
        }

        throw new IllegalStateException("No available port found between " + preferredPort + " and " + (preferredPort + MAX_PORT_PROBES));
    }

    private boolean isPortAvailable(int port) {
        try (ServerSocket serverSocket = new ServerSocket()) {
            serverSocket.setReuseAddress(true);
            serverSocket.bind(new InetSocketAddress("0.0.0.0", port));
            return true;
        } catch (IOException ex) {
            return false;
        }
    }
}