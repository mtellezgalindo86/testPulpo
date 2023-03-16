<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

<p>
  Este proyecto utiliza el framework Nest.js para crear una API que provee información sobre ayuda humanitaria. La API se conecta con la API de IATI y recupera información sobre ayuda humanitaria para un país y un rango de años especificados.

La información se obtiene mediante una solicitud GET al endpoint /aid/:countryCode/:years. Donde countryCode es el código ISO de dos letras del país que se desea consultar y years es un rango de años separado por un guión. Por ejemplo, /aid/US/2016-2020 devolverá información sobre la ayuda humanitaria que recibió Estados Unidos desde el año 2016 hasta el año 2020.

La información se devuelve en formato JSON con la siguiente estructura:
</p>
<p>
{
  "year1": {
    "title1": "valor1",
    "title2": "valor2"
  },
  "year2": {
    "title1": "valor1",
    "title2": "valor2"
  }
}
</p>
<p>
Donde year es el año en que se otorgó la ayuda, title es el título de la ayuda y valor es la cantidad de dinero otorgada en esa ayuda.
</p>
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```

