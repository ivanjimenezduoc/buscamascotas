package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.java.en.And;
import runners.WebDriverConfig;
import scala.util.Random;
import java.io.File;
import java.time.Duration;



import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class primerSuitDePruebas {
    private WebDriver driver;
    private ScenarioContext scenarioContext;

    public primerSuitDePruebas(ScenarioContext scenarioContext) {
        this.scenarioContext = scenarioContext;

    }


    

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
        WebElement elemento = driver.findElement(By.xpath("//*[contains(text(), '" + menu + "')]"));
        assertEquals(elemento.getText().toLowerCase(),menu.toLowerCase(),"El elemento no se encontró");
    }

    @And("valido el carrusel del inicio")
    public void validoElCarruselDelInicio(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class='slider_section']")));
        assertTrue(elemento.isDisplayed());
    }

    @Then("valido la seccion Sobre Nosotros")
    public void validoLaSeccionSobreNosotros(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'Sobre nosotros')]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("voy a la seccion de {string}")
    public void voyALaSeccionDe(String seccion){
        WebElement elemento = driver.findElement(By.xpath("(//*[contains(text(), '" + seccion + "')])[1]"));
        elemento.click();
    }
    @And("la pagina deberia mostrar el texto {string}")
    public void laPaginaDeberiaMostrarElTexto(String texto) {
        WebElement elemento = driver.findElement(By.xpath("//h2[contains(text(), '" + texto + "')]"));
        String tituloActual = elemento.getText();
        System.out.println(tituloActual);
        assertEquals(texto, tituloActual);
    }
    
    @And("valido que existan registros de mascotas perdidas")
    public void ValidoQueExistanRegistrosDeMascotasPerdidas() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("mascotas-container")));
        assertTrue(elemento.isDisplayed());
    }

    @And("cierro el navegador")
    public void cierroElnavegador(){
        driver.quit();
    }

    @And("valido que exista el campo {string}")
    public void validoQueExistaElCampo(String campo){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'"+campo+"')])[1]")));
        assertTrue(elemento.isDisplayed());

    }

    @And("valido que exista el boton {string}")
    public void validoQueExistaElboton(String boton){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'"+boton+"')]")));
        assertTrue(elemento.isDisplayed());

    }

    @And("valido que muestre el color de la mascotas")
    public void validoQueMuestreElColorDeLaMascotas(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//div[@class='color-circle'])[1]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("valido que el titulo de la pagina sea {string}")
    public void validoQueElTituloDeLaPaginaSea(String titulo){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'"+titulo+"')]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("valido que el mapa este desplegado en la pantalla")
    public void validoQueElMapaEsteDesplegadoEnLaPantalla(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("mapPrincipal")));
        assertTrue(elemento.isDisplayed());
    }

    @And("valido que exista el campo {string} de mascota perdida")
    public void validoQueExistaElCampoDeMascotaPerdida(String campo){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'"+campo+"')])[3]")));
        assertTrue(elemento.isDisplayed());

    }
    @When("doy click al boton ingresar")
    public void doyClickAlBoton(){
        WebElement elemento = driver.findElement(By.xpath("//button[@id='signInButton']"));
        elemento.click();
    } 

    @And("ingreso el valor {string} en el campo Nombre")
    public void ingresoElValorEnElCampo(String valor){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Nombre']")));
        assertTrue(elemento.isDisplayed());
        Random random = new Random();
        int numeroAleatorio = random.nextInt(1000); // Puedes ajustar el rango según lo necesites
        // Concatenar el número aleatorio al valor original
        String valorConNumero = valor + numeroAleatorio;
        // Enviar el valor generado al campo
        scenarioContext.set("nombreGenerado", valorConNumero);
        System.out.println((String) scenarioContext.get("nombreGenerado"));
        assertEquals(valorConNumero,scenarioContext.get("nombreGenerado"));
        elemento.sendKeys(valorConNumero);
    }


    @And("ingreso el valor {string} en el campo Fecha de Nacimiento")
    public void ingresoElValorEnElCampoFechaDeNacimiento(String valor){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Fecha de Nacimiento']")));
        assertTrue(elemento.isDisplayed());
        scenarioContext.set("fechaNacimiento", valor);
        System.out.println((String) scenarioContext.get("fechaNacimiento"));
        elemento.sendKeys(valor);
    }

    @And("ingreso el valor {string} en el campo Dirección")
    public void ingresoElValorEnElCampoFechaDeDireccion(String valor){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Dirección']")));
        assertTrue(elemento.isDisplayed());
        scenarioContext.set("direccion", valor);
        System.out.println((String) scenarioContext.get("direccion"));
        elemento.sendKeys(valor);
    }

    @And("ingreso el valor {string} en el campo E-mail")
    public void ingresoElValorEnElCampoFechaDeEmail(String valor){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//input[@placeholder='E-mail'])[2]")));
        assertTrue(elemento.isDisplayed());
        Random random = new Random();
        int numeroAleatorio = random.nextInt(1000); // Puedes ajustar el rango según lo necesites
        // Concatenar el número aleatorio al valor original
        String valorConNumero = valor + numeroAleatorio+"@gmail.com";
        scenarioContext.set("email", valorConNumero);
        System.out.println((String) scenarioContext.get("email"));
        assertEquals(valorConNumero,scenarioContext.get("email"));
        // Enviar el valor generado al campo
        elemento.sendKeys(valorConNumero);
    }

    @And("ingreso el valor {string} en el campo Teléfono 1")
    public void ingresoElValorEnElCampoFechaDeTelefono1(String valor){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Teléfono 1']")));
        assertTrue(elemento.isDisplayed());
        scenarioContext.set("fono1", valor);
        System.out.println((String) scenarioContext.get("fono1"));
        assertEquals(valor,scenarioContext.get("fono1"));
        elemento.sendKeys(valor);
    }

    @And("ingreso el valor {string} en el campo Teléfono 2")
    public void ingresoElValorEnElCampoFechaDeTelefono2(String valor){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Teléfono 2']")));
        assertTrue(elemento.isDisplayed());
        scenarioContext.set("fono2", valor);
        System.out.println((String) scenarioContext.get("fono2"));
        assertEquals(valor,scenarioContext.get("fono2"));
        elemento.sendKeys(valor);
    }

    @And("ingreso el valor {string} en el campo Contraseña")
    public void ingresoElValorEnElCampoFechaDeContrasena(String valor){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Contraseña']")));
        assertTrue(elemento.isDisplayed());
        Random random = new Random();
        int numeroAleatorio = random.nextInt(1000); 
        String valorFinal = valor+numeroAleatorio;
        scenarioContext.set("pass", valorFinal);
        System.out.println((String) scenarioContext.get("pass"));
        assertEquals(valorFinal,scenarioContext.get("pass"));
        elemento.sendKeys(valorFinal);
    }

    @And("ingreso el valor en el campo Repite tu Contraseña")
    public void ingresoElValorEnElCampoFechaDeRepetirContrasena(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Repite tu Contraseña']")));
        assertTrue(elemento.isDisplayed());
        System.out.println((String) scenarioContext.get("pass"));
        elemento.sendKeys((String)scenarioContext.get("pass"));
    }

    @And("doy click en registrarse")
    public void doyClickEnRegistrarse(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//span[@class='agreement'])[2]")));
        assertTrue(elemento.isDisplayed());
        elemento.click();
    }

    @And("ingreso mi correo para logearme")
    public void ingresoMiCorreoParaLogearme(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//input[@placeholder='E-mail'])[1]")));
        assertTrue(elemento.isDisplayed());
        elemento.sendKeys((String)scenarioContext.get("email"));
    }

    @And("registro mi usuario")
    public void registroMiUsuario(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@value='Registrarse']")));
        assertTrue(elemento.isDisplayed());
        elemento.click();
    }

    @And("ingreso mi contraseña y me logeo")
    public void ingresoMiContrasenaYMeLogeo(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//input[@placeholder='Password'])[1]")));
        assertTrue(elemento.isDisplayed());
        elemento.sendKeys((String)scenarioContext.get("pass"));
        WebElement button = driver.findElement(By.xpath("(//*[contains(text(),'Ingresar')])[3]"));
        button.click();
    }

    @Then("valido que me muestre seccion Mis Mascotas")
    public void validoQueMeMuestreSeccionMisMascotas(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Mis mascotas')])[1]")));
        assertTrue(elemento.isDisplayed());
    }

    @Then("valido que me muestre seccion Mis Mascotas y doy click")
    public void validoQueMeMuestreSeccionMisMascotasYDoyClick(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Mis mascotas')])[1]")));
        assertTrue(elemento.isDisplayed());
        elemento.click();
    }

    @Then("valido que me permita deslogearme y me deslogeo")
    public void validoQueNoMePermitaDeslogearme(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Salir')])[1]")));
        assertTrue(elemento.isDisplayed());
        elemento.click();
        WebElement elemento2 = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Ingresar')])[1]")));
        assertTrue(elemento2.isDisplayed());
    }

    @And("ingreso mi correo {string} para logearme")
    public void ingresoMiCorreoAParaLogearme(String correo){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//input[@placeholder='E-mail'])[1]")));
        assertTrue(elemento.isDisplayed());
        elemento.sendKeys(correo);
    }

    @And("ingreso mi contraseña {string} y me logeo")
    public void ingresoMiContrasenaAYMeLogeo(String contrasena){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//input[@placeholder='Password'])[1]")));
        assertTrue(elemento.isDisplayed());
        elemento.sendKeys(contrasena);
        WebElement button = driver.findElement(By.xpath("(//*[contains(text(),'Ingresar')])[3]"));
        button.click();
    }

    @And("valido que muestre seccion Mi Perfil")
    public void validoQueMuestreSeccionMiPerfil(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h5[contains(text(),'Mi Perfil')]")));
        assertTrue(elemento.isDisplayed());
    }
    
    @And("valido que el nombre sea el correcto")
    public void validoQueElNombreSeaElCorrecto(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Nombre')])[1]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("valido que el correo sea el correcto")
    public void validoQueElCorreoSeaElCorrecto(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Correo Electrónico')])[1]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("valido que la direccion sea la correcta")
    public void validoQueLaDireccionSeaLaCorrecta(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Dirección')])[1]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("valido que el telefono sea el correcto")
    public void validoQueElTelefonoSeaElCorrecto(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Teléfono 1')])[1]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("doy click en Agregar Mascota")
    public void doyClickEnAgregarMascota(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Agregar Mascota')])[1]")));
        assertTrue(elemento.isDisplayed());
        elemento.click();
    }

    @And("valido que exista el campo Nombre en el formulario")
    public void validoQueExistaElCampoNombreEnElFormulario(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'Nombre')])[2]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("valido que exista el campo {string} en el formulario")
    public void validoQueExistaElCampoEnElFormulario(String campo){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//*[contains(text(),'"+campo+"')])[1]")));
        assertTrue(elemento.isDisplayed());
    }

    @And("ingreso {string} en el campo {string}")
    public void ingresoEnElCampoNombre(String valor,String campo){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='"+campo+"']")));
        assertTrue(elemento.isDisplayed());
        elemento.sendKeys(valor);
    }

    @And("subo la imagen {string} al formulario")
    public void suboLaImagenAlFormulario(String nomImagen){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='imagenMascota']")));
        assertTrue(elemento.isDisplayed());
        File archivoImagen = new File("src/test/resources/"+nomImagen);
        if (archivoImagen.exists()) {
            // Usar sendKeys para subir el archivo
            elemento.sendKeys(archivoImagen.getAbsolutePath());
        } 
        else {
            System.out.println("El archivo no existe en la ruta especificada");
        }
    }

    @And("guardo la informacion de la mascota")
    public void guardoLaInformacionDeLaMascota() throws InterruptedException{
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("(//button[contains(text(),'Cancelar')])/../button[1]")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", elemento);
        // Esperar 3 segundos
        Thread.sleep(3000);
        

    }

    @And("valido que se muestre la informacion")
    public void validoQueSeMuestreLaInformacion(){
        WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
        WebElement elemento = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='mascotas-container']")));
        assertTrue(elemento.isDisplayed());
    }

    
}
