import io.mockk.mockk
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.kryptokrona.hugin.service.PostEncryptedGroupService
import org.kryptokrona.hugin.service.PostEncryptedService
import org.kryptokrona.hugin.service.PostService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.web.servlet.mvc.Controller

@ExtendWith(SpringExtension::class)
@WebMvcTest(Controller::class)
class StatisticsControllerTest {

    @TestConfiguration
    open class ControllerTestConfig {
        @Bean
        open fun postService() = mockk<PostService>()

        @Bean
        open fun postEncryptedService() = mockk< PostEncryptedService>()

        @Bean
        open fun postEncryptedGroupService() = mockk<PostEncryptedGroupService>()
    }

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var service: PostService

    @Test
    fun `testing`() {

    }

}