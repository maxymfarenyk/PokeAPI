package com.maxymfarenyk.PokeAPI_backend.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "pokemon.api")
class PokemonApiProperties {
    lateinit var baseUrl: String
}
