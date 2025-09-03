package com.maxymfarenyk.PokeAPI_backend.service

import com.maxymfarenyk.PokeAPI_backend.model.*
import kotlinx.coroutines.*
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.awaitBodyOrNull

const val BASE_URL = "https://pokeapi.co/api/v2/pokemon"

@Service
class PokemonService(private val webClient: WebClient) {

    suspend fun getPokemon(nameOrId: String): PokemonResponse? = coroutineScope {
        val rawPokemonData: RawPokemonData? = try {
            webClient.get()
                .uri("$BASE_URL/$nameOrId")
                .retrieve()
                .awaitBodyOrNull<RawPokemonData>()
        } catch (e: Exception) {
            null
        }

        if (rawPokemonData == null) {
            return@coroutineScope null
        }

        val locationDeferred = if (rawPokemonData.location_area_encounters.isNotEmpty()) {
            async { getPokemonLocation(rawPokemonData.location_area_encounters) }
        } else {
            CompletableDeferred(null)
        }

        val locationName = locationDeferred.await()

        PokemonResponse(
            id = rawPokemonData.id,
            name = rawPokemonData.name,
            sprites = Sprites(front_default = rawPokemonData.sprites.front_default),
            types = rawPokemonData.types,
            stats = rawPokemonData.stats,
            moves = rawPokemonData.moves,
            location = locationName
        )
    }

    private suspend fun getPokemonLocation(locationUrl: String): String? {
        return try {
            if (locationUrl.isEmpty()) return null

            val locations: Array<LocationResponse>? = webClient.get()
                .uri(locationUrl)
                .retrieve()
                .awaitBodyOrNull<Array<LocationResponse>>()

            locations?.firstOrNull()?.location_area?.name
        } catch (e: Exception) {
            null
        }
    }
}