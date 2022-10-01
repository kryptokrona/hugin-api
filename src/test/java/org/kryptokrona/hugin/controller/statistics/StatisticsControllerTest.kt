package org.kryptokrona.hugin.controller.statistics

import io.mockk.mockk
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.kryptokrona.hugin.service.HashtagService
import org.kryptokrona.hugin.service.PostEncryptedGroupService
import org.kryptokrona.hugin.service.PostEncryptedService
import org.kryptokrona.hugin.service.PostService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import kotlin.test.assertEquals

@ExtendWith(SpringExtension::class)
@WebMvcTest(StatisticsController::class)
class StatisticsControllerTest {

    private var baseUrl = "/api/v1/statistics"

    @TestConfiguration
    open class ControllerTestConfig {
        @Bean
        open fun postService() = mockk<PostService>(relaxed = true)

        @Bean
        open fun postEncryptedService() = mockk< PostEncryptedService>(relaxed = true)

        @Bean
        open fun postEncryptedGroupService() = mockk<PostEncryptedGroupService>(relaxed = true)

        @Bean
        open fun hashtagService() = mockk<HashtagService>(relaxed = true)
    }

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `can list post statistics`() {
        val result = mockMvc.perform(get("$baseUrl/posts"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

    @Test
    fun `can list post encrypted statistics`() {
        val result = mockMvc.perform(get("$baseUrl/posts-encrypted"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

    @Test
    fun `can list post encrypted group statistics`() {
        val result = mockMvc.perform(get("$baseUrl/posts-encrypted-group"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

    @Test
    fun `can list hashtag statistics`() {
        val result = mockMvc.perform(get("$baseUrl/hashtags"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

}