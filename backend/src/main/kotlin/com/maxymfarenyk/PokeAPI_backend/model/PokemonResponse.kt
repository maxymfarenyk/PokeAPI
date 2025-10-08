package com.maxymfarenyk.PokeAPI_backend.model

data class PokemonResponse(
    val id: Int,
    val name: String,
    val sprites: Sprites,
    val types: List<TypeWrapper>,
    val stats: List<StatWrapper>,
    val moves: List<MoveWrapper>,
    val location: String?
)

data class Sprites(
    val front_default: String
)

data class TypeWrapper(
    val type: Type
)

data class Type(
    val name: String
)

data class StatWrapper(
    val stat: Stat,
    val base_stat: Int
)

data class Stat(
    val name: String
)

data class MoveWrapper(
    val move: Move
)

data class Move(
    val name: String
)