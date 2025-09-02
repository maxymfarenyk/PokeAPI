package com.maxymfarenyk.PokeAPI_backend.service

import com.maxymfarenyk.PokeAPI_backend.model.*
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject
import org.springframework.web.client.exchange
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity

const val BASE_URL = "https://pokeapi.co/api/v2/pokemon"

@Service
class PokemonService(private val restTemplate: RestTemplate) {

    fun getPokemon(nameOrId: String): PokemonResponse? {
        val rawPokemonData: RawPokemonData = try {
            restTemplate.getForObject<RawPokemonData>("$BASE_URL/$nameOrId")
        } catch (e: Exception) { return null } ?: return null

        val locationName = getPokemonLocation(rawPokemonData.location_area_encounters)

        return PokemonResponse(
            id = rawPokemonData.id,
            name = rawPokemonData.name,
            sprites = Sprites(front_default = rawPokemonData.sprites.front_default),
            types = rawPokemonData.types,
            stats = rawPokemonData.stats,
            moves = rawPokemonData.moves,
            location = locationName
        )
    }

    private fun getPokemonLocation(locationUrl: String): String? {
        return try {
            if (locationUrl.isEmpty()) return null

            val locations: Array<LocationResponse>? =
                restTemplate.getForObject(locationUrl, Array<LocationResponse>::class.java)

            locations?.firstOrNull()?.location_area?.name
        } catch (e: Exception) {
            null
        }
    }

}


