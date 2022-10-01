package org.kryptokrona.hugin.controller.statistics

import io.mockk.mockk
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.kryptokrona.hugin.service.statistics.StatisticsPostEncryptedGroupService
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
@WebMvcTest(StatisticsPostEncryptedGroupController::class)
class StatisticsPostEncryptedGroupControllerTest {

    private var baseUrl = "/api/v1/statistics/posts-encrypted-group/datapoints"

    @TestConfiguration
    open class ControllerTestConfig {
        @Bean
        open fun statisticsPostEncryptedGroupService() = mockk<StatisticsPostEncryptedGroupService>(relaxed = true)
    }

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `can list 10 minute post statistics`() {
        val result = mockMvc.perform(get("$baseUrl/10m?datapoints=10"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

    @Test
    fun `can not list 10 minute post statistics without datapoint request param`() {
        val result = mockMvc.perform(get("$baseUrl/10m"))
            .andExpect(status().is4xxClientError)
            .andDo(print())
            .andReturn()

        assertEquals(400, result.response.status)
    }

    @Test
    fun `can list hour post statistics`() {
        val result = mockMvc.perform(get("$baseUrl/hours?datapoints=24"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

    @Test
    fun `can not list hour post statistics without datapoint request param`() {
        val result = mockMvc.perform(get("$baseUrl/hours"))
            .andExpect(status().is4xxClientError)
            .andDo(print())
            .andReturn()

        assertEquals(400, result.response.status)
    }

    @Test
    fun `can list 24h post statistics`() {
        val result = mockMvc.perform(get("$baseUrl/24h?datapoints=7"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

    @Test
    fun `can not list 24h post statistics without datapoint request param`() {
        val result = mockMvc.perform(get("$baseUrl/24h"))
            .andExpect(status().is4xxClientError)
            .andDo(print())
            .andReturn()

        assertEquals(400, result.response.status)
    }

    @Test
    fun `can list week post statistics`() {
        val result = mockMvc.perform(get("$baseUrl/weeks?datapoints=4"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

    @Test
    fun `can not list week post statistics without datapoint request param`() {
        val result = mockMvc.perform(get("$baseUrl/weeks"))
            .andExpect(status().is4xxClientError)
            .andDo(print())
            .andReturn()

        assertEquals(400, result.response.status)
    }

    @Test
    fun `can list month post statistics`() {
        val result = mockMvc.perform(get("$baseUrl/months?datapoints=12"))
            .andExpect(status().isOk)
            .andDo(print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

    @Test
    fun `can not list month post statistics without datapoint request param`() {
        val result = mockMvc.perform(get("$baseUrl/months"))
            .andExpect(status().is4xxClientError)
            .andDo(print())
            .andReturn()

        assertEquals(400, result.response.status)
    }
}