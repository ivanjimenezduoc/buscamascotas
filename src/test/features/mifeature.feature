Feature: Navegación en la página de mascotas

  Scenario: El usuario accede a la página principal
    Given el usuario esta en la pagina principal
    When el usuario hace clic en "Buscar Mascotas"
    Then se muestra la seccion de busqueda

