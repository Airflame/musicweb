package com.musicweb.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.provisioning.UserDetailsManager
import org.springframework.stereotype.Service

@Service
class RegisterService @Autowired constructor(
    var userDetailsService: UserDetailsManager,
    var bCryptPasswordEncoder: BCryptPasswordEncoder
) {

    fun registerUser(username: String, password: String) {
        userDetailsService.createUser(User(username, bCryptPasswordEncoder.encode(password),
            listOf(SimpleGrantedAuthority("ROLE_USER"))));
    }
}