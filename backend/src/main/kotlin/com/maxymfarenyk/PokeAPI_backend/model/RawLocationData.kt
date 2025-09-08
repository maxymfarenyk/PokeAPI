package com.maxymfarenyk.PokeAPI_backend.model

data class LocationResponse(
    val location_area: LocationArea
)

data class LocationArea(
    val name: String
)
