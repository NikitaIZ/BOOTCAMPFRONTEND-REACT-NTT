<h1 align="center">
  <img src="public/imgs/logotipo.jpg" alt="Super Market" width="140">
  <br>
  PROYECTO BOOTCAMP
  <br>
</h1>

<p align="center">
<img src="https://img.shields.io/badge/stable-0.3.0-blue.svg">
<img src="https://img.shields.io/badge/license-MIT-orange.svg">
</p>

Este es un proyecto para un bootcamp, en el cual se iran añadiendo las diferentes herramientas para el desarrollo web. 

## Requirimientos

  - [Node.js  22.11](https://nodejs.org/en/)

## Instalación

    cd BOOTCAMPFRONTEND-REACT-NTT
    npm install
    npm run build
    npm run dev

## Documentación

### feature/diseños-y-estilos: 

Diseño de pagina principal para la tienda utilizando unicamente HTML y CSS3, en especial elementos como:

- Flexbox
- Diseño responsive

### feature/javascript:

Implentacion del javascript en el proyecto, usando vite y la api de https://dummyjson.com/, se añádieron cambios a la pagina como:

- Un buscador funcional
- Se muestran las categorias de la propia api y al hacer click los productos cambian a la selecionada
- Al hacer click a un producto aparece una notificacion numerica en el carrito que va incrementando
- Un paginate para mejor carga de los productos
- Las tarjetas muestras informacion del producto de la propia api como el nombre, description, precio, cantidad, descuento, etc
- Al selecionar la maxima cantidad de productos esta se bloquea y ya no se puede incrementar el numero en el carrito

### feature/typescript:

Se convirtieron todos los archivos javascript de la rama anterior a typescript, ademas de usar webpack para una mejor configuracion y contruccion de los archivos typescript a javascript tiene los mismos elementos de la rama anterior

## Licencia

BOOTCAMPFRONTEND-REACT-NTT es un software de código abierto licenciado bajo la [MIT license](https://github.com/NikitaIZ/BOOTCAMPFRONTEND-REACT-NTT/blob/feature/dise%C3%B1os-y-estilos/LICENSE.md).