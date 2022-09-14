import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootWar

buildscript {
	repositories {
		mavenCentral()
		flatDir {
			dirs("libs")
		}
	}
	dependencies {
		classpath("org.springframework.boot:spring-boot-gradle-plugin:2.7.3.RELEASE")
	}
}

//---------------------------------------------------------------------------------
// PLUGINS
//---------------------------------------------------------------------------------

plugins {
	id("org.springframework.boot") version "2.7.3"
	id("io.spring.dependency-management") version "1.0.13.RELEASE"
	id("java")
	id("war")
	kotlin("jvm") version "1.7.10"
	kotlin("plugin.lombok") version "1.7.10"
	id("io.freefair.lombok") version "5.3.0"
//	id("com.dorongold.task-tree") version "2.1.0"
//	id("checkstyle")
//	id("pmd")
//	id("de.aaschmid.cpd") version "3.3"
//	id("com.github.spotbugs") version "5.0.4"
//	id("jacoco")
}

group = "org.kryptokrona"
val version: String by project

java {
	sourceCompatibility = JavaVersion.VERSION_17
	targetCompatibility = JavaVersion.VERSION_17
}

tasks.getByName<BootWar>("bootWar") {
	enabled = false
}

tasks.getByName<War>("war") {
	enabled = true
}

repositories {
	mavenCentral()
}

tasks.processResources {
	filesMatching("application.yml") {
		expand(project.properties)
	}
}


//---------------------------------------------------------------------------------
// DEPENDENCIES
//---------------------------------------------------------------------------------

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-websocket")
	implementation("io.github.classgraph:classgraph:4.8.149")
	implementation("com.h2database:h2:2.1.214")
	// implementation("com.kryptokrona.sdk:kryptokrona-sdk:0.1.0")
	implementation("org.springdoc:springdoc-openapi-ui:1.6.11") { // might get this version to use in libs
		exclude("org.webjars:swagger-ui") // exlcuding this module so we can use the custom below
	}
	implementation(files("libs/swagger-ui-3.49.0.jar")) // custom jar file for our custom swagger-ui theme

	developmentOnly("org.springframework.boot:spring-boot-devtools")
	runtimeOnly("org.postgresql:postgresql")
	providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")

	testImplementation(kotlin("stdlib-jdk8"))
	testImplementation(kotlin("test"))
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}


//---------------------------------------------------------------------------------
// TEST CONFIGURATION
//---------------------------------------------------------------------------------

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
	kotlinOptions.jvmTarget = "17"
}


//---------------------------------------------------------------------------------
// TASKS
//---------------------------------------------------------------------------------

tasks.register("printVersion") {
	doLast {
		println(project.version)
	}
}