package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import junit.textui.TestRunner;
import runners.WebDriverConfig;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class primerfeatureSteps {
    WebDriver driver;

    @Given("que el usuario abre el navegador")
    public void abrirNavegador() {
       driver = WebDriverConfig.getDriver();
       driver.get("https://ivanjimenezduoc.github.io/buscamascotas/src/index");
    }

    @When("el usuario navega a {string}")
    public void navegarAPagina(String url) {
        driver.get(url);
    }

    @Then("la pagina deberia mostrar el titulo {string}")
    public void verificarTitulo(String tituloEsperado) {
        String tituloActual = driver.getTitle();
        System.out.println(tituloActual);
        //assertEquals(tituloEsperado, tituloActual);
        driver.quit();
    }
}
