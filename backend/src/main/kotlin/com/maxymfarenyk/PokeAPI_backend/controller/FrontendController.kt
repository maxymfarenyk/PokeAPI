package com.maxymfarenyk.PokeAPI_backend.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class RootController {

    @GetMapping("/")
    fun redirectToPokemon(): String {
        return "redirect:/pokemon"
    }
}
