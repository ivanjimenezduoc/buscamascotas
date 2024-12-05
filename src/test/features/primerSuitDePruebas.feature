Feature: Primer suit de prueba - Navegación básica en la página

  @suit1
  Scenario: Validar titulo y menus del home (inicio, mascotas perdidas, mascotas encontradas, ingresar)
    Given que el usuario abre el navegador
    When la pagina deberia mostrar el titulo "BuscaMascotas"
    And valido que se muestre el menu "Inicio"
    And valido que se muestre el menu "Mascotas perdidas"
    And valido que se muestre el menu "Mascotas encontradas"
    Then valido que se muestre el menu "Ingresar"
    And cierro el navegador

  @suit1
  Scenario: Validar secciones del home 
    Given que el usuario abre el navegador
    And valido el carrusel del inicio
    And valido que se muestre el menu "Ingresar"
    Then valido la seccion Sobre Nosotros
    And cierro el navegador

  @suit1
  Scenario: Validar secciones del menu de mascotas perdidas 
    Given que el usuario abre el navegador
    When voy a la seccion de "Mascotas perdidas"
    And la pagina deberia mostrar el texto "Mascotas Perdidas"
    And valido que existan registros de mascotas perdidas
    And valido que exista el campo "Nombre"
    And valido que exista el campo "Especie"
    And valido que exista el campo "Raza"
    And valido que exista el campo "Sexo"
    And valido que exista el campo "Tamaño"
    And valido que exista el boton "Más Info"
    Then valido que muestre el color de la mascotas
    And cierro el navegador
  
  @suit1
  Scenario: Validar seccion del menu de mascotas encontradas 
    Given que el usuario abre el navegador
    When voy a la seccion de "Mascotas encontradas"
    And valido que el titulo de la pagina sea "Mascotas reportadas como encontradas"
    And valido que el mapa este desplegado en la pantalla
    And valido que exista el boton "Agregar Mascota"
    And valido que existan registros de mascotas perdidas
    And valido que exista el campo "Especie" de mascota perdida
    And valido que exista el campo "Raza" de mascota perdida
    And valido que exista el campo "Sexo" de mascota perdida
    And valido que exista el campo "Tamaño" de mascota perdida
    And valido que exista el boton "Más Info"
    Then valido que muestre el color de la mascotas
    And cierro el navegador    