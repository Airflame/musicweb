package com.musicweb

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MusicwebApplication

fun main(args: Array<String>) {
	runApplication<MusicwebApplication>(*args)
}
