Feature: Segundo suit de Pruebas

##@suit2
##Scenario: Crear un nuevo perfil y logearse 
##Given que el usuario abre el navegador
##When doy click al boton ingresar
##And doy click en registrarse
##And ingreso el valor "Nombre_PruebaQA_" en el campo Nombre
##And ingreso el valor "03/04/1900" en el campo Fecha de Nacimiento
##And ingreso el valor "Direccion de prueba" en el campo Dirección
##And ingreso el valor "Correo_PruebaQA_" en el campo E-mail
##And ingreso el valor "+56999999999" en el campo Teléfono 1
##And ingreso el valor "+56988888888" en el campo Teléfono 2
##And ingreso el valor "PruebaQA_" en el campo Contraseña
##And ingreso el valor en el campo Repite tu Contraseña
##And registro mi usuario
##And ingreso mi correo para logearme
##And ingreso mi contraseña y me logeo
##Then valido que me muestre seccion Mis Mascotas
##Then valido que me permita deslogearme y me deslogeo
##And cierro el navegador
##
##@e2e
##Scenario:aa
##Given que el usuario abre el navegador
##When doy click al boton ingresar
##And doy click en registrarse
##And ingreso el valor "Nombre_PruebaQA_" en el campo Nombre
##And ingreso el valor "03/04/1900" en el campo Fecha de Nacimiento
##And ingreso el valor "Direccion de prueba" en el campo Dirección
##And ingreso el valor "Correo_PruebaQA_" en el campo E-mail
##And ingreso el valor "+56999999999" en el campo Teléfono 1
##And ingreso el valor "+56988888888" en el campo Teléfono 2
##And ingreso el valor "PruebaQA_" en el campo Contraseña
##And ingreso el valor en el campo Repite tu Contraseña
##And registro mi usuario
##And ingreso mi correo para logearme
##And ingreso mi contraseña y me logeo
##And valido que me muestre seccion Mis Mascotas y doy click
##And valido que muestre seccion Mi Perfil
##And valido que el nombre sea el correcto
##And valido que el correo sea el correcto
##And valido que la direccion sea la correcta
##Then valido que el telefono sea el correcto
##And cierro el navegador
##
##@suit2
##Scenario: Me logeo y valido mis datos ingresados
##Given que el usuario abre el navegador
##When doy click al boton ingresar
##And ingreso mi correo "Correo_PruebaQA_235@gmail.com" para logearme
##And ingreso mi contraseña "PruebaQA_369" y me logeo
##And valido que me muestre seccion Mis Mascotas y doy click
##And valido que muestre seccion Mi Perfil
##And valido que el nombre sea el correcto
##And valido que el correo sea el correcto
##And valido que la direccion sea la correcta
##Then valido que el telefono sea el correcto
##And cierro el navegador
##
##@suit2
##Scenario: Valido formulario para registrar Mascota
##Given que el usuario abre el navegador
##When doy click al boton ingresar
##And ingreso mi correo "Correo_PruebaQA_235@gmail.com" para logearme
##And ingreso mi contraseña "PruebaQA_369" y me logeo
##And valido que me muestre seccion Mis Mascotas y doy click
##And doy click en Agregar Mascota 
##And valido que exista el campo Nombre en el formulario
##And valido que exista el campo "Especie" en el formulario
##And valido que exista el campo "Edad" en el formulario
##And valido que exista el campo "Sexo" en el formulario
##And valido que exista el campo "Raza" en el formulario
##And valido que exista el campo "Tamaño" en el formulario
##And valido que exista el campo "Color 1" en el formulario
##And valido que exista el campo "Color 2" en el formulario
##And valido que exista el campo "Color 3" en el formulario
##And valido que exista el campo "Estado" en el formulario
##And valido que exista el campo "Descripción" en el formulario
##And valido que exista el campo "Imagen" en el formulario
##Then valido que exista el boton "Guardar"
##And cierro el navegador

@suit2
Scenario: Registro una Mascota desde un usuario
Given que el usuario abre el navegador
When doy click al boton ingresar
And ingreso mi correo "fab.ramirez@duocuc.cl" para logearme
And ingreso mi contraseña "12312" y me logeo
And valido que me muestre seccion Mis Mascotas y doy click
And doy click en Agregar Mascota 
And ingreso "PruebaQA_Cachupin" en el campo "nombre"
And ingreso "2" en el campo "edad"
And ingreso "Perro" en el campo "especie"
And ingreso "Macho" en el campo "sexo"
And ingreso "Mediano" en el campo "tamano"
And ingreso "Mestizo" en el campo "raza"
And ingreso "Blanco" en el campo "color1"
And ingreso "Gris" en el campo "color2"
And ingreso "Negro" en el campo "color3"
And ingreso "No Perdido" en el campo "estado"
And ingreso "Prueba QA Registrando Mascota" en el campo "descripcion"
And subo la imagen "PruebaQa.png" al formulario
And guardo la informacion de la mascota
Then valido que se muestre la informacion
And cierro el navegador






