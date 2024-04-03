package com.musicweb.config

import com.musicweb.service.TokenService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig @Autowired constructor(
    var tokenService: TokenService,
) {

    @Bean
    fun filterChainBasic(http: HttpSecurity): SecurityFilterChain {
        http {
            csrf {
                disable()
            }
            cors {
                disable()
            }
            oauth2ResourceServer {
                jwt {  }
            }
            authorizeRequests {
                authorize("/v1/register", permitAll)
                authorize("/v1/login", permitAll)
                authorize("/**", authenticated)
            }
            sessionManagement {
                SessionCreationPolicy.STATELESS
            }
            httpBasic {}
        }
        http.authenticationManager { auth ->
            val jwt = auth as BearerTokenAuthenticationToken
            val user = tokenService.parseToken(jwt.token) ?: throw InvalidBearerTokenException("Invalid token")
            UsernamePasswordAuthenticationToken(user, "", listOf(SimpleGrantedAuthority("USER")))
        }
        return http.build()
    }
}