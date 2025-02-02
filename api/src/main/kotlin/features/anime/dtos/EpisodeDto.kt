package xyz.aniways.features.anime.dtos

import kotlinx.serialization.Serializable

@Serializable
data class EpisodeDto(
    val id: String,
    val title: String?,
    val number: Int,
    val isFiller: Boolean,
)

@Serializable
data class RawEpisodeData(
    val status: Boolean,
    val html: String?,
    val totalItems: Int?,
)