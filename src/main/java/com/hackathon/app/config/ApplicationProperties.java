package com.hackathon.app.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Barclays Hackathon Repo.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link tech.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
@Getter
@Setter
public class ApplicationProperties {

    private String apiKey;
    private String environmentId;
}
