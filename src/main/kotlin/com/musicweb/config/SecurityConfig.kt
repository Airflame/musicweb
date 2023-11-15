package com.musicweb.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.provisioning.JdbcUserDetailsManager
import org.springframework.security.provisioning.UserDetailsManager
import javax.sql.DataSource

@Configuration
class SecurityConfig

@Bean
fun users(dataSource: DataSource): UserDetailsManager {
    val users = JdbcUserDetailsManager(dataSource)
    return users
}