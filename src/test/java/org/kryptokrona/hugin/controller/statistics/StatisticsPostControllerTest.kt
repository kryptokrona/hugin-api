import org.junit.jupiter.api.extension.ExtendWith
import org.kryptokrona.hugin.controller.statistics.StatisticsPostController
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@WebMvcTest(StatisticsPostController::class)
class StatisticsPostControllerTest {

}