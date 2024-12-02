<h1 align="center">
  <img src="public/imgs/logotipo.png" alt="Super Market" width="140">
  <br>
  PROYECTO BOOTCAMP
  <br>
</h1>

<p align="center">
<img src="https://img.shields.io/badge/stable-0.5.0-blue.svg">
<img src="https://img.shields.io/badge/license-MIT-orange.svg">
</p>

Este es un proyecto para un bootcamp, en el cual se iran añadiendo las diferentes herramientas para el desarrollo web. 

## Requirimientos

  - [Node.js  22.11](https://nodejs.org/en/)

## Instalación

    cd BOOTCAMPFRONTEND-REACT-NTT
    npm install
    npm run dev

## Documentación

### feature/diseños-y-estilos: 

Diseño de pagina principal para la tienda utilizando unicamente HTML y CSS3, en especial elementos como:

- Flexbox.
- Diseño responsive.

### feature/javascript:

Implentacion del javascript en el proyecto, usando vite y la api de https://dummyjson.com/, se añádieron cambios a la pagina como:

- Un buscador funcional
- Se muestran las categorias de la propia api y al hacer click los productos cambian a la selecionada.
- Al hacer click a un producto aparece una notificacion numerica en el carrito que va incrementando.
- Un paginate para mejor carga de los productos.
- Las tarjetas muestras informacion del producto de la propia api como el nombre, description, precio, cantidad, descuento, etc.
- Al selecionar la maxima cantidad de productos esta se bloquea y ya no se puede incrementar el numero en el carrito.

### feature/typescript:

Se convirtieron todos los archivos javascript de la rama anterior a typescript, ademas de usar webpack para una mejor configuracion y contruccion de los archivos typescript a javascript el cual cumple en hacer los mismos elementos de la rama anterior.

### feature/react-fundamentos:

En esta fase del proyecto se paso toda la funcionalidad creada en la rama feature/javascript a React, para el tema de las rutas se uso react-router-dom, que ayudo a la facilidad de pasar la informacion sin perdela entre las paginas del proyecto.

### feature/react-implementacion:

Continuando con el proyecto ahora usando react en esta rama se agregaron y cambiaron varias cosas entre ellas:

#### Mejoras

- Nuevo orden de las carpetas y archivos.
- Los context y reducer comparten una misma logica.
- Los estilos de css estan separados por componentes y paginas, solo se dejo el index.css para variables globales.
- El buscador se limpia al cambiar de paginas.
- Al buscar, cambiar de categoria o volver al inicio el paginate se reinicia.

#### Novedades

- Nueva pagina al hacer click en el carrito.
- La pagina del carrito muestra los productos registrados en una tabla, a su vez se puede modificar la cantidad de los productos, esto de manera dinamica cambiara la cantidad y el precio total a pagar que se muestra al final de la tabla.
- En la misma pagina del carrito hay un formulario para comprar para que el cliente se registre (Si se registra el cliente se podra ver en *Console* los datos que se almacenaron, para mejor detalle se puede ver en *Application* ).
- Nueva carpeta para los Hooks.

### feature/pruebas-unitarias:

En esta fase se crearon carpetas y archivos para testear el proyecto, sus hooks, mapper, pages, components, etc.

Existe una carpeta coverage en la cual se puede visualizar el resultado de las pruebas en el archivo index.html dentro de la carpeta Icov-report.

### feature/proyecto-integrador:

#### Novedades

- Se creo una pagina de login.
- Se validaron las rutas para visualizar ciertas paginas dependiendo si estas logeado o no.
- Al ingresar estara el Username del usuario en el Header, asi como una opcion de salir al pasar el cursor por el nombre del usuario.
- Se validaron estos cambios con varios archivos de test, tambien se actualizo el coverage.
- En el caso de olvidar la contraseña saldra un modal que pedira un correo (pero esto es solo simulación).

#### Login

Como información para el login se utilizo segun la documentacion [Dummyjson Auth-Login](https://dummyjson.com/docs/auth#auth-login), asi que el usuario y contraseña por defecto son: 

* Usuario : emilys
* Contraseña : emilyspass

## Licencia

BOOTCAMPFRONTEND-REACT-NTT es un software de código abierto licenciado bajo la [MIT license](https://github.com/NikitaIZ/BOOTCAMPFRONTEND-REACT-NTT/blob/feature/dise%C3%B1os-y-estilos/LICENSE.md).