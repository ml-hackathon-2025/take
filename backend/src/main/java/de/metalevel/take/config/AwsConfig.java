package de.metalevel.take.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;

@Configuration
public class AwsConfig {
    @Bean
    public CognitoIdentityProviderClient cognitoIdp() {
        return CognitoIdentityProviderClient.builder()
                .region(Region.US_EAST_1)
                .build();
    }
}
