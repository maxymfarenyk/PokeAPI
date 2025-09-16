plugins {
	kotlin("jvm") version "1.9.25"
	kotlin("plugin.spring") version "1.9.25"
	id("org.springframework.boot") version "3.5.5"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.maxymfarenyk"
version = "0.0.1-SNAPSHOT"
description = "Backend for PokeAPI"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// Core dependency for building web applications and RESTful APIs.
	// Includes an embedded Tomcat server and Spring MVC.
	implementation("org.springframework.boot:spring-boot-starter-web")

	// Required for using Kotlin data classes with Jackson for JSON serialization/deserialization.
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

	// Provides Kotlin reflection support, which is needed by Spring.
	implementation("org.jetbrains.kotlin:kotlin-reflect")

	// Core Spring Boot test dependency.
	testImplementation("org.springframework.boot:spring-boot-starter-test")

	// Coroutines for async fetching
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")

	// WebFlux for WebClient
	implementation("org.springframework.boot:spring-boot-starter-webflux")
}

kotlin {
	compilerOptions {
		freeCompilerArgs.addAll("-Xjsr305=strict")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}