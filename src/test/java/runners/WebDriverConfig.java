package runners;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class WebDriverConfig {
    public static WebDriver getDriver() {
         // Configurar opciones para Chrome en modo headless
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        // Crear instancia del WebDriver
        return new ChromeDriver(options);
    }
}
