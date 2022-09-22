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

tasks.processResources {}


//---------------------------------------------------------------------------------
// DEPENDENCIES
//---------------------------------------------------------------------------------

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-websocket")
	implementation("org.springframework.data:spring-data-commons:2.7.2")
	implementation("org.springframework.session:spring-session-core:2.7.0")
	implementation("io.github.classgraph:classgraph:4.8.149")
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf:2.7.3")
	implementation("com.fasterxml.jackson.core:jackson-databind:2.13.4")
	implementation("org.apache.httpcomponents.client5:httpclient5:5.1.3")
	implementation("org.apache.httpcomponents.client5:httpclient5-fluent:5.1.3")
	implementation("com.github.seancfoley:ipaddress:5.3.4")
	implementation("io.reactivex.rxjava3:rxjava:3.1.4")
	implementation("com.h2database:h2:2.1.214")
	// implementation("com.kryptokrona.sdk:kryptokrona-sdk:0.1.0")
	implementation("org.springdoc:springdoc-openapi-ui:1.5.9") { // might get this version to use in libs
		exclude("org.webjars:swagger-ui") // exlcuding this module so we can use the custom below
	}
	implementation(files("libs/swagger-ui-3.49.0.jar")) // custom jar file for our custom swagger-ui theme
	implementation("org.webjars:webjars-locator-core:0.52")
	implementation("org.webjars:sockjs-client:1.5.1")
	implementation("org.webjars:stomp-websocket:2.3.4")
	implementation("org.webjars:bootstrap:5.2.0")
	implementation("org.webjars.bower:jquery:3.6.1")

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