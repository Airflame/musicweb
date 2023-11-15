package com.musicweb.controller

import com.musicweb.controller.dto.RegisterRequest
import com.musicweb.service.RegisterService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1")
class RegisterController @Autowired constructor(var registerService: RegisterService) {

    @PostMapping("/register")
    fun registerUser(@RequestBody registerRequest: RegisterRequest) {
        registerService.registerUser(registerRequest.username, registerRequest.username)
    }
}