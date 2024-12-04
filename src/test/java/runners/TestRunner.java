package runners;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import steps.ScenarioContext;

import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.junit.After;
import org.junit.Before;


@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/features",
    glue = "steps",
    plugin = {"pretty", "html:target/cucumber-reports.html"}
)
public class TestRunner {
    private WebDriver driver;
    private static ScenarioContext scenarioContext;

    @Before
    public void setUp() {
        driver = WebDriverConfig.getDriver();
        scenarioContext = new ScenarioContext();
    }
    public static ScenarioContext getScenarioContext() {
        return scenarioContext;
    }

    @After
    public void tearDown() {
        driver.quit();
    }
}
