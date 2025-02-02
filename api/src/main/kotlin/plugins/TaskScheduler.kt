package xyz.aniways.plugins

import io.ktor.server.application.*
import org.koin.ktor.ext.get
import xyz.aniways.features.tasks.RecentlyUpdatedScraperTask
import xyz.aniways.features.tasks.AllAnimeScraperTask
import xyz.aniways.features.tasks.NewAnimeScraperTask
import xyz.aniways.features.tasks.plugins.TaskSchedulerPlugin

fun Application.configureTaskScheduler() {
    install(TaskSchedulerPlugin) {
        tasks = listOf(
            AllAnimeScraperTask(get()),
            RecentlyUpdatedScraperTask(get()),
            NewAnimeScraperTask(get())
        )
    }
}