import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootWar

plugins {
	id("org.springframework.boot") version "2.7.3"
	id("io.spring.dependency-management") version "1.0.13.RELEASE"
	id("java")
	id("war")
	kotlin("jvm") version "1.7.10"
	kotlin("plugin.lombok") version "1.7.10"
	id("io.freefair.lombok") version "5.3.0"
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

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-websocket")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	runtimeOnly("org.postgresql:postgresql")
	providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")

	testImplementation(kotlin("stdlib-jdk8"))
	testImplementation(kotlin("test"))
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
	kotlinOptions.jvmTarget = "17"
}

tasks.register("printVersion") {
	doLast {
		println(project.version)
	}
}