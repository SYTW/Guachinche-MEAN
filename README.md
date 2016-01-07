# Proyecto de Sistemas y Tecnologías Web

## Descripción

Este proyecto es una aplicación web para la gestión y publicación de [Guachinches](https://es.wikipedia.org/wiki/Guachinche) en las islas canarias. Donde se pueda disponer de toda la información referida a una publicación de un usuario interesado en la divulgación de la información acerca de este establecimiento gastronómico típico de Canarias.

El proyecto se realizara para la asignatura Sistemas y Tecnologías web del Grado Ingeniería en Informática de la Universidad de la Laguna.

## Tecnologías del proyecto

Para el desarrollo de la aplicación se ha hecho uso de las siguientes tecnologías:

### Dependencias:

* body-parser: para el parseo de parámetros 
* mongoose: para la base de datos
* jwt-simple: para la autenticación mediante tokens
* request: para la autorización de Google - llamadas HTTPS
* satellizer: autenticación con AngularJS

### Servidor

* NodeJS
* Express
* MongoDB

### Cliente

* AngularJS
* Materialize

### Uso de REST

La aplicación hace uso de REST (Representational State Transfer) para las rutas. Se usan los siguientes métodos:

* GET -> /api/guachinches : Obtener el listado de Guachinches 
* POST -> /api/guachinches : Se añade un nuevo guachinche al listado
* GET -> /api/guachinches/:id : Se obtiene un guachinche en concreto 
* GET -> /api/users/:id : Se obtiene las publicaciones de dicho usuario 
* DELETE -> /api/users/release/:id : Se borra la publicación de dicho usuario 

### OAuth2

Protocolo para la autenticación, en este caso se hace uso de la API de Google. Para ello, se sigue el siguiente modelo:

* Nos registramos en Google y autorizamos la aplicación.
* Si la autenticación es correcta, obtenendremos el authorization code en el cliente. 
* El cliente envía el authorization code al servidor de la aplicación para la transformación en un access token.
* En el servidor de la app, el authorization code se transformará en un access token, almacenando también los datos del usuario.
* El servidor envía al cliente el access token y se almacenará en el almacenamiento local del cliente. 

## Despliegue

El despliegue se ha realizado en Cloud9 ya que se hace uso de MongoDB en la aplicación.   

## Desarrolladores

* David Carlos Reyes
* Carlota Lázaro Hernández

## Enlaces

[GuachinchApp](https://proyecto-stw-davidcr.c9users.io/)

[Material Design](https://www.google.com/design/spec/material-design/introduction.html)
