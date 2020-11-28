# Front Products

Este proyecto es el front para el desafio. Consiste en un buscador y un listado de productos encontrados.

### Tecnologías

Listado de las principales librerias usadas.

* [React]: Creación de componentes React
* [ES6]: Estandar javascript principalmente usado.
* [Webpack]: Generador de bundles y configuración del proyecto.
* [Mocha]: Framework de pruebas utilizado.
* [Enzyme]: Librería utilitaria para probar componente React.

### Instalación

Debes instalar la herramienta NVM, con esto puedes manejar las versiones de node y npm de este proyecto independiente de cualquier otro que tengas, puedes usar el comando siguiente, o revisar la [página de nvm](https://github.com/nvm-sh/nvm).
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```
Luego ejecutar:
```
nvm use
npm i
```
Con esto ya habrás instalado todo lo necesario.

### Ejecutar junto al BFF

Para ejecutar el front en conjunto con su bff, primero que nada debes descargar el siguiente repositorio:

```
git clone https://github.com/walmartdigital/brand-discounts-db
```

Luego debes ejecutar los siguientes comandos:
```
cd brand-discounts-db
make database-up
```
Esto levantará un contendor con una base de datos mongo.
Luego vuelve a este repositorio ejecuta el comando:
```
MACHINE_IP=<tu-ip> DB_SECRET_PASSWORD=brandDiscountsPassword npm run start:bff
```
Debes ingresar la ip de tu máquina para que los contendores internamente puedan comunicarse.
Con esto el proyecto quedará listo en la url http://localhost:8080



### Desarrollo

Existen varios comandos útiles, los cuales se listan a continuación:

* **npm start**: Levanta el proyecto en tu maquina local.
* **npm run start:stubs**: Levanta el proyecto y un backend dummy.
* **npm run start:bff**: Levanta front, bff y un microservicio.
* **npm run stubby**: Levanta un backed dummy con algunas respuestas JSON de prueba.
* **npm run lint**: Ejecuta el análisis sintactico usando eslint.
* **npm run test:unit**: Ejecuta las pruebas unitarias.
* **npm run test:unit:watch**: Ejecuta las pruebas en modo TDD.
* **npm run security:test**: Ejecuta el análisis de vulnerabilidades usando snyk.
* **npm run coverage**: Ejecuta el análisis de cobertura de pruebas unitarias para lineas, ramas, sentencias y funciones con un umbral mínimo de 90 porciento.
* **npm run ci**: Ejecuta todas las tareas de integracion continua.


### ¿Como correr el proyecto?

Solo debemos ejecutar **npm start:stubs**, y entrar en:

http://localhost:8080

### Análisis de vulnerabilidades
Para realzar análisis de vulnerabilidades se ocupa snyk. Para pruebas locales es necesario setear previamente un token de autentificación para snyk.

```
export SNYK_TOKEN = 1d696347-xxx-xxx-xxxx-e900af15230e
```

En caso de que no se encuentre este token, se abrira en el navegador una pestaña para iniciar sesión en snyk.

Para ejecutar el análisis:

```
npm run security:test
```
Más información respecto al token se puede encontrar en la documentación oficial de [snyk](https://snyk.io/docs/cli-authentication/)
