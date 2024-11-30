package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.java.en.And;
import runners.WebDriverConfig;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class primerfeatureSteps {
    WebDriver driver;

    @Given("que el usuario abre el navegador")
    public void abrirNavegador() {
       driver = WebDriverConfig.getDriver();
       driver.get("https://ivanjimenezduoc.github.io/buscamascotas/src/templates/index");
    }

    @When("la pagina deberia mostrar el titulo {string}")
    public void laPaginaDeberiaMostrarElTitulo(String tituloEsperado) {
        String tituloActual = driver.getTitle();
        System.out.println(tituloActual);
        assertEquals(tituloEsperado, tituloActual);
    }

    @And("valido que se muestre el menu {string}")
    public void validarQueSeMuestreElTitulo(String menu){
        // Usar espera explícita para esperar hasta que el menú sea visible
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(60));
        WebElement cargaElemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@id='navbarSupportedContent']")));
        WebElement elemento = driver.findElement(By.xpath("//*[contains(text(), '" + menu + "')]"));
        assertEquals(elemento.getText().toLowerCase(),menu.toLowerCase(),"El elemento no se encontró");
    }
    
}
