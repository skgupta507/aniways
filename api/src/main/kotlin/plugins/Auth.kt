package xyz.aniways.plugins

import com.auth0.jwt.JWT
import io.ktor.client.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.sessions.*
import kotlinx.serialization.Serializable
import org.koin.ktor.ext.inject
import xyz.aniways.env
import xyz.aniways.features.auth.oauth.MalOauthProvider

sealed class Auth {
    companion object {
        const val MAL_OAUTH = "mal-oauth"
        const val SESSION = Session.UserSession.KEY
    }

    @Serializable
    data class UserPrincipal(val id: Int, val token: String) : Auth()
}

fun Application.configureAuth() {
    val httpClient by inject<HttpClient>()
    val callbackUrl = "${env.serverConfig.apiUrl}/auth/callback"
    val credentials = env.malCredentials
    val codeChallenges = mutableMapOf<String, String>()

    install(Authentication) {
        oauth(Auth.MAL_OAUTH) {
            client = httpClient
            urlProvider = { callbackUrl }
            providerLookup = {
                val provider = MalOauthProvider(
                    ctx = this,
                    credentials = credentials,
                    callbackUrl = callbackUrl,
                    codeChallenges = codeChallenges
                )

                provider.getSettings()
            }
        }

        session<Session.UserSession>(Auth.SESSION) {
            validate {
                val id = JWT.decode(it.token).subject
                Auth.UserPrincipal(id.toInt(), it.token)
            }

            challenge {
                it?.let { call.sessions.set(it) }
                call.respond(HttpStatusCode.Unauthorized)
            }
        }
    }
}