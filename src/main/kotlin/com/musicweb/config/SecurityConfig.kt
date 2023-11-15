package com.musicweb.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.provisioning.JdbcUserDetailsManager
import org.springframework.security.provisioning.UserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import javax.sql.DataSource

@Configuration
class SecurityConfig {

    @Bean
    fun filterChainBasic(http: HttpSecurity): SecurityFilterChain {
        http.invoke {
            csrf {
                disable()
            }
            authorizeRequests {
                authorize("/v1/register", permitAll)
                authorize("/**", authenticated)
            }
            httpBasic {}
        }
        return http.build()
    }

    @Bean
    fun userDetailsManager(dataSource: DataSource): UserDetailsManager {
        val userDetailsManager = JdbcUserDetailsManager(dataSource)
        return userDetailsManager
    }

    @Bean
    fun bCryptPasswordEncoder(): BCryptPasswordEncoder {
        return BCryptPasswordEncoder()
    }
}