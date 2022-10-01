import io.mockk.mockk
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.kryptokrona.hugin.controller.statistics.StatisticsPostController
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import kotlin.test.assertEquals

@ExtendWith(SpringExtension::class)
@WebMvcTest(StatisticsPostController::class)
class StatisticsPostControllerTest {

    private var baseUrl = "/api/v1/statistics/posts"

    @TestConfiguration
    open class ControllerTestConfig {
        @Bean
        open fun postService() = mockk<PostService>(relaxed = true)
    }

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `can list 10 minute post statistics`() {
        val result = mockMvc.perform(MockMvcRequestBuilders.get("$baseUrl/10m"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andDo(MockMvcResultHandlers.print())
            .andReturn()

        assertEquals(200, result.response.status)
    }

}