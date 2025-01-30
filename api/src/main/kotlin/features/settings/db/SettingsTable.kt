package xyz.aniways.features.settings.db

import org.ktorm.database.Database
import org.ktorm.entity.Entity
import org.ktorm.entity.sequenceOf
import org.ktorm.schema.Table
import org.ktorm.schema.boolean
import org.ktorm.schema.int

interface Settings : Entity<Settings> {
    var userId: Int
    var autoNextEpisode: Boolean
    var autoPlayEpisode: Boolean
    var autoUpdateMal: Boolean

    companion object : Entity.Factory<Settings>()
}

object SettingsTable: Table<Settings>("settings") {
    val userId = int("user_id").primaryKey().bindTo { it.userId }
    val autoNextEpisode = boolean("auto_next_episode").bindTo { it.autoNextEpisode }
    val autoPlayEpisode = boolean("auto_play_episode").bindTo { it.autoPlayEpisode }
    val autoUpdateMal = boolean("auto_update_mal").bindTo { it.autoUpdateMal }
}

val Database.settings get() = this.sequenceOf(SettingsTable)