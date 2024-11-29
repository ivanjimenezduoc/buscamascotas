package runners;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/features",
    glue = "steps",
    plugin = {"pretty", "html:target/cucumber-reports.html"}
)
public class TestRunner {
    private WebDriver driver;

    @Before
    public void setUp() {
        driver = WebDriverConfig.getDriver();
    }

    @After
    public void tearDown() {
        driver.quit();
    }
}