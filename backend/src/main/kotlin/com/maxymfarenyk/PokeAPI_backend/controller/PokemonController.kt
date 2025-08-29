package com.maxymfarenyk.PokeAPI_backend.controller

import com.maxymfarenyk.PokeAPI_backend.model.*
import com.maxymfarenyk.PokeAPI_backend.service.PokemonService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/pokemon")
@CrossOrigin(origins = ["http://localhost:4200"])
class PokemonController(private val pokemonService: PokemonService) {

    @GetMapping("/{nameOrId}")
    fun getPokemon(@PathVariable nameOrId: String): ResponseEntity<PokemonResponse> {
        val pokemon = pokemonService.getPokemon(nameOrId)
        return if (pokemon != null) {
            ResponseEntity.ok(pokemon)
        } else {
            ResponseEntity.notFound().build()
        }
    }
}