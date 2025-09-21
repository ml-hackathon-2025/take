package de.metalevel.take.config;

import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/actuator/health").permitAll()
                        .anyRequest().authenticated())
                .oauth2ResourceServer(oauth -> oauth.jwt(
                        configurer -> configurer.jwtAuthenticationConverter(
                                jwtAuthConverter()
                        )
                ));
        return http.build();
    }

    private Converter<Jwt,? extends AbstractAuthenticationToken> jwtAuthConverter() {
        var conv = new JwtAuthenticationConverter();
        var granted = new JwtGrantedAuthoritiesConverter();
        granted.setAuthoritiesClaimName("cognito:groups");
        granted.setAuthorityPrefix("ROLE_");
        conv.setJwtGrantedAuthoritiesConverter(granted);
        return conv;
    }
}
