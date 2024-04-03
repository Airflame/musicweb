package com.musicweb.controller

import com.musicweb.controller.dto.UserDto
import com.musicweb.service.TokenService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.provisioning.UserDetailsManager
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1")
class AuthController @Autowired constructor(
    var tokenService: TokenService,
    var userDetailsService: UserDetailsManager,
    var bCryptPasswordEncoder: BCryptPasswordEncoder) {

    @PostMapping("/login")
    fun login(@RequestBody userDto: UserDto): ResponseEntity<String> {
        val user = userDetailsService.loadUserByUsername(userDto.username) as User

        if (!bCryptPasswordEncoder.matches(userDto.password, user.password)) {
            return ResponseEntity.badRequest().build()
        }

        return ResponseEntity.ok(tokenService.createToken(user))
    }

    @PostMapping("/register")
    fun register(@RequestBody userDto: UserDto): ResponseEntity<String> {
        if (userDetailsService.userExists(userDto.username)) {
            return ResponseEntity.badRequest().build()
        }

        val user = User(userDto.username, bCryptPasswordEncoder.encode(userDto.password),
            listOf(SimpleGrantedAuthority("ROLE_USER")))
        userDetailsService.createUser(user);

        return ResponseEntity.ok(tokenService.createToken(user))
    }
}