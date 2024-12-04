Feature: Test E2E

  @e2e
  Scenario: E2E - Creo perfil dueño, registro mi mascota, cambio el estado a perdida, valido que aparezca en el modulo de Mascotas Perdidas y genero el cartel
    Given que el usuario abre el navegador
    When doy click al boton ingresar
    And doy click en registrarse
    ##Flujo crear dueño
    And ingreso el valor "Nombre_PruebaQA_" en el campo Nombre
    And ingreso el valor "03/04/1900" en el campo Fecha de Nacimiento
    And ingreso el valor "Direccion de prueba" en el campo Dirección
    And ingreso el valor "Correo_E2E_PruebaQA_" en el campo E-mail
    And ingreso el valor "+56999999999" en el campo Teléfono 1
    And ingreso el valor "+56988888888" en el campo Teléfono 2
    And ingreso el valor "PruebaQA_" en el campo Contraseña
    And ingreso el valor en el campo Repite tu Contraseña
    And registro mi usuario
    ##Flujo login
    And ingreso mi correo para logearme
    And ingreso mi contraseña y me logeo
    And valido que me muestre seccion Mis Mascotas y doy click
    And valido que muestre seccion Mi Perfil
    And valido que el nombre sea el correcto
    And valido que el correo sea el correcto
    And valido que la direccion sea la correcta
    Then valido que el telefono sea el correcto
    ##Flujo crear mascota
    And doy click en Agregar Mascota
    And ingreso "QA_Cachupin" en el campo "nombre"
    And ingreso "2" en el campo "edad"
    And ingreso "Otro" en el campo "especie"
    And ingreso "Macho" en el campo "sexo"
    And ingreso "Grande" en el campo "tamano"
    And ingreso "Geco" en el campo "raza"
    And ingreso "verde" en el campo "color1"
    And ingreso "verde" en el campo "color2"
    And ingreso "verde" en el campo "color3"
    And ingreso "No Perdido" en el campo "estado"
    And ingreso "Prueba QA Registrando Mascota" en el campo "descripcion"
    And subo la imagen "PruebaQa.png" al formulario
    And guardo la informacion de la mascota
    Then valido que se muestre la informacion
    ##Flujo reportarla como perdida
    And cambio el estado de mi mascota "QA_Cachupin" a "Perdido"
    And agrego la ultima ubicacion en "Plaza de Maipu" de la mascota
    And guardo los datos modificados
    Then valido el estado de la mascota
    ##Flujo valido que aparezca en modulo Mascotas Perdidas
    And cambio a la ventana de mascotas perdidas
    Then valido que exista el registro de mi mascota
    ##Flujo genero el cartel
    And valido que me muestre seccion Mis Mascotas y doy click
    And cambio el estado de mi mascota "PruebaQA_Cachupin" a "Perdido"
    And agrego la ultima ubicacion en "Plaza de Maipu" de la mascota
    And doy click a generar el cartel
    And valido que se genere el cartel de perdido
    And cierro el navegador

  @e2e
  Scenario: E2E - Creo perfil dueño, registro mi mascota, cambio el estado a perdida, valido que aparezca en el modulo de Mascotas Perdidas, reporto una mascota encontrada y valido coincidencia de mascota
    Given que el usuario abre el navegador
    When doy click al boton ingresar
    And doy click en registrarse
    ##Flujo crear dueño
    And ingreso el valor "Nombre_PruebaQA_" en el campo Nombre
    And ingreso el valor "03/04/1900" en el campo Fecha de Nacimiento
    And ingreso el valor "Direccion de prueba" en el campo Dirección
    And ingreso el valor "Correo_PruebaQA_" en el campo E-mail
    And ingreso el valor "+56999999999" en el campo Teléfono 1
    And ingreso el valor "+56988888888" en el campo Teléfono 2
    And ingreso el valor "PruebaQA_" en el campo Contraseña
    And ingreso el valor en el campo Repite tu Contraseña
    And registro mi usuario
    ##Flujo login
    And ingreso mi correo para logearme
    And ingreso mi contraseña y me logeo
    And valido que me muestre seccion Mis Mascotas y doy click
    And valido que muestre seccion Mi Perfil
    And valido que el nombre sea el correcto
    And valido que el correo sea el correcto
    And valido que la direccion sea la correcta
    Then valido que el telefono sea el correcto
    ##Flujo crear mascota
    And doy click en Agregar Mascota
    And ingreso "PruebaQA_E2E" en el campo "nombre"
    And ingreso "2" en el campo "edad"
    And ingreso "Otro" en el campo "especie"
    And ingreso "Hembra" en el campo "sexo"
    And ingreso "mediana" en el campo "tamano"
    And ingreso "rata" en el campo "raza"
    And ingreso "cafe" en el campo "color1"
    And ingreso "cafe" en el campo "color2"
    And ingreso "cafe" en el campo "color3"
    And ingreso "No Perdido" en el campo "estado"
    And ingreso "Prueba QA Registrando Mascota" en el campo "descripcion"
    And subo la imagen "PruebaQa.png" al formulario
    And guardo la informacion de la mascota
    Then valido que se muestre la informacion
    ##Flujo reportarla como perdida
    And cambio el estado de mi mascota "PruebaQA_E2E" a "Perdido"
    And agrego la ultima ubicacion en "Templo de maipu" de la mascota
    And guardo los datos modificados
    Then valido el estado de la mascota
    ##Flujo valido que aparezca en modulo Mascotas Perdidas
    And cambio a la ventana de mascotas perdidas
    Then valido que exista el registro de mi mascota
    ##Flujo reportar mascota encontrada
    And voy al modulo de reportas una mascota encontrada
    And doy click en agregar mascota perdida
    And ingreso el dato "otro" en el campo "especie"
    And ingreso el dato "rata" en el campo "raza"
    And ingreso el dato "hembra" en el campo "sexo"
    And ingreso el dato "mediana" en el campo "tamano"
    And ingreso el dato "cafe" en el campo "color1"
    And ingreso el dato "cafe" en el campo "color2"
    And ingreso el dato "cafe" en el campo "color3"
    And ingreso el dato "Prueba Automatizada QA" en el campo "descripcion"
    And ingreso el dato "Templo de maipu" en el campo "ubicacion"
    And subo la imagen "PruebaQa.png" al formulario
    And guardo la informacion de la mascota
    And valido que la mascota se haya registrado
    Then valido mensaje "Se encontraron coincidencias" de que existan mascotas similares