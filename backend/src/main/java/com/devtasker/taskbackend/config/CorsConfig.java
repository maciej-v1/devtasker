package com.devtasker.taskbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Development-time CORS configuration.
 *
 * Why this exists:
 * - The frontend dev server (Vite) runs on http://localhost:5173
 * - The backend runs on http://localhost:8080
 * - Browsers block cross-origin requests by default (same-origin policy)
 *
 * This configuration explicitly allows the frontend to call the backend API
 * during local development.
 *
 * Important:
 * - This is NOT a production-ready CORS policy.
 * - In production, CORS should be:
 *     - restricted to the actual frontend origin, OR
 *     - avoided entirely by serving frontend + backend from the same origin.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*");
    }
}