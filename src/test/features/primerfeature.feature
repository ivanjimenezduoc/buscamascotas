Feature: Navegación básica en la página

  Scenario: Validar titulo y menus del home (inicio, mascotas perdidas, mascotas encontradas, ingresar)
    Given que el usuario abre el navegador
    When la pagina deberia mostrar el titulo "BuscaMascotas"
    And valido que se muestre el menu "Inicio"
    And valido que se muestre el menu "Mascotas perdidas"
    And valido que se muestre el menu "Mascotas encontradas"
    Then valido que se muestre el menu "Ingresar"
    
    