package com.maxymfarenyk.PokeAPI_backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.resource.PathResourceResolver

@Configuration
class AppConfig : WebMvcConfigurer {

    @Bean
    fun webClient(): WebClient {
        return WebClient.builder()
            .codecs { configurer ->
                configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024) // increased buffer size from 256kb to 16mb
            }
            .build()
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry
            .addResourceHandler("/**")
            .addResourceLocations("classpath:/static/PokeAPI/browser/")
            .resourceChain(true)
            .addResolver(object : PathResourceResolver() {
                override fun getResource(resourcePath: String, location: Resource): Resource? {
                    if (resourcePath.startsWith("api/")) {
                        return null
                    }
                    val requestedResource = location.createRelative(resourcePath)
                    return if (requestedResource.exists() && requestedResource.isReadable) {
                        requestedResource
                    } else {
                        location.createRelative("index.html")
                    }
                }
            })
    }
}