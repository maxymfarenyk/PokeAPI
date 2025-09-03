package com.maxymfarenyk.PokeAPI_backend.model

data class RawPokemonData(
    val id: Int,
    val name: String,
    val sprites: RawSprites,
    val types: List<TypeWrapper>,
    val stats: List<StatWrapper>,
    val moves: List<MoveWrapper>,
    val location_area_encounters: String
)

data class RawSprites(
    val front_default: String
)

data class LocationResponse(
    val location_area: LocationArea
)

data class LocationArea(
    val name: String
)