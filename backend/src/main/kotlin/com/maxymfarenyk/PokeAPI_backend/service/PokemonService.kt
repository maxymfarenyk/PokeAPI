package com.maxymfarenyk.PokeAPI_backend.service

import com.maxymfarenyk.PokeAPI_backend.config.PokemonApiProperties
import com.maxymfarenyk.PokeAPI_backend.model.*
import kotlinx.coroutines.*
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.awaitBodyOrNull

@Service
class PokemonService(
    private val webClient: WebClient,
    private val properties: PokemonApiProperties,
    private val scope: CoroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
) {

    suspend fun getPokemon(nameOrId: String): PokemonResponse? {
        return try {

            val rawPokemonDeferred = scope.async {
                webClient.get()
                    .uri("${properties.baseUrl}/$nameOrId")
                    .retrieve()
                    .awaitBodyOrNull<RawPokemonData>()
            }

            val locationDeferred = scope.async {
                getPokemonLocation("${properties.baseUrl}/$nameOrId/encounters")
            }

            val rawPokemonData = rawPokemonDeferred.await() ?: return null
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

        } catch (e: Exception) {
            null
        }
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