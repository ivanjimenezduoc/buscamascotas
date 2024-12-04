Feature: Tercer suit de pruebas - Validaciones Mascotas Perdidas y e2e

  @suit3
  Scenario: validar que al cambiar estado de mascota perdida a encontrada aparezca en modulo mascota perdida
    Given que el usuario abre el navegador
    When doy click al boton ingresar
    And ingreso mi correo "fab.ramirez@duocuc.cl" para logearme
    And ingreso mi contraseña "12312" y me logeo
    And valido que me muestre seccion Mis Mascotas y doy click
    And cambio el estado de mi mascota "PruebaQA_Cachupin" a "Perdido"
    And agrego la ultima ubicacion en "Plaza de Maipu" de la mascota
    And guardo los datos modificados
    And cambio a la ventana de mascotas perdidas
    Then valido que exista el registro de mi mascota
    And cierro el navegador

  @suit3
  Scenario: validar sugerencia de mascota al reportar una como perdida
    Given que el usuario abre el navegador
    When doy click al boton ingresar
    And ingreso mi correo "fab.ramirez@duocuc.cl" para logearme
    And ingreso mi contraseña "12312" y me logeo
    And valido que me muestre seccion Mis Mascotas y doy click
    And cambio el estado de mi mascota "PruebaQA_Cachupin" a "Perdido"
    And agrego la ultima ubicacion en "Plaza de Maipu" de la mascota
    And guardo los datos modificados
    Then valido mensaje "Se encontraron coincidencias" de que existan mascotas similares
    And cierro el navegador

  @suit3
  Scenario: validar informacion posterior al cambio de estado de una mascota
    Given que el usuario abre el navegador
    When doy click al boton ingresar
    And ingreso mi correo "fab.ramirez@duocuc.cl" para logearme
    And ingreso mi contraseña "12312" y me logeo
    And valido que me muestre seccion Mis Mascotas y doy click
    And cambio el estado de mi mascota "PruebaQA_Cachupin" a "Perdido"
    And agrego la ultima ubicacion en "Plaza de Maipu" de la mascota
    And guardo los datos modificados
    And cambio a la ventana de mascotas perdidas
    Then valido que exista el registro de mi mascota
    And cierro el navegador

  @suit3
  Scenario: validar poder reportar una mascota encontrada sin logearse
    Given que el usuario abre el navegador
    When doy click al boton ingresar
    And voy al modulo de reportas una mascota encontrada
    And doy click en agregar mascota perdida
    And ingreso el dato "Otro" en el campo "especie"
    And ingreso el dato "Loro" en el campo "raza"
    And ingreso el dato "Desconocido" en el campo "sexo"
    And ingreso el dato "pequeño" en el campo "tamano"
    And ingreso el dato "Negro" en el campo "color1"
    And ingreso el dato "Rosa" en el campo "color2"
    And ingreso el dato "Sable" en el campo "color3"
    And ingreso el dato "Prueba Automatizada QA" en el campo "descripcion"
    And ingreso el dato "camino melipilla" en el campo "ubicacion"
    And subo la imagen "PruebaQa.png" al formulario
    And guardo la informacion de la mascota
    Then valido que la mascota se haya registrado
    And cierro el navegador

  @suit3
  Scenario: validar poder reportar una mascota encontrada logeado
    Given que el usuario abre el navegador
    When doy click al boton ingresar
    And ingreso mi correo "fab.ramirez@duocuc.cl" para logearme
    And ingreso mi contraseña "12312" y me logeo
    And voy al modulo de reportas una mascota encontrada
    And doy click en agregar mascota perdida
    And ingreso el dato "gato" en el campo "especie"
    And ingreso el dato "oriental" en el campo "raza"
    And ingreso el dato "Desconocido" en el campo "sexo"
    And ingreso el dato "gigante" en el campo "tamano"
    And ingreso el dato "blanco" en el campo "color1"
    And ingreso el dato "negro" en el campo "color2"
    And ingreso el dato "cafe" en el campo "color3"
    And ingreso el dato "Prueba Automatizada QA" en el campo "descripcion"
    And ingreso el dato "camino melipilla" en el campo "ubicacion"
    And subo la imagen "PruebaQa.png" al formulario
    ##And guardo la informacion de la mascota
    Then valido que la mascota se haya registrado
    And cierro el navegador