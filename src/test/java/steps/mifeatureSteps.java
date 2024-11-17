package steps;

import org.openqa.selenium.WebDriver;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

public class mifeatureSteps {
    WebDriver driver;

    @Given("el usuario esta en la pagina principal")
    public void usuarioEnPaginaPrincipal() {
        System.out.println("El usuario está en la pagina principal.");
    }

    @When("el usuario hace clic en {string}")
    public void usuarioHaceClic(String boton) {
        System.out.println("El usuario hizo clic en: " + boton);
    }

    @Then("se muestra la seccion de busqueda")
    public void muestraSeccionBusqueda() {
        System.out.println("Se muestra la sección de búsqueda.");
        driver.quit();
    }
}
