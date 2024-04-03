package com.musicweb.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.provisioning.JdbcUserDetailsManager
import org.springframework.security.provisioning.UserDetailsManager
import javax.sql.DataSource

@Configuration
class UserConfig {

    @Bean
    fun userDetailsManager(dataSource: DataSource): UserDetailsManager {
        return JdbcUserDetailsManager(dataSource)
    }

    @Bean
    fun bCryptPasswordEncoder(): BCryptPasswordEncoder {
        return BCryptPasswordEncoder()
    }
}