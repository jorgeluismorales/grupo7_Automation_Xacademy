
# 🚀 Proyecto de Automatización con Cypress y Allure

Este proyecto está diseñado para automatizar pruebas end-to-end usando Cypress y generar reportes visuales con Allure. Es ideal para equipos que buscan calidad, trazabilidad y facilidad de integración continua.



## 📦 Instalación de dependencias

1. Clona el repositorio y accede a la carpeta del proyecto:
   ```bash
   git clone https://github.com/jorgeluismorales/grupo7_Automation_Xacademy.git
   cd grupo7_Automation_Xacademy/cypress
   ```

2. Instala todas las dependencias necesarias:
   ```bash
   npm install
   ```


## 🧪 ¿Cómo ejecutar los casos de prueba?

- Para limpiar reportes anteriores, ejecutar todos los tests y generar el reporte Allure en un solo paso:
  ```bash
  npm test
  ```
  Este comando ejecuta todos los casos de prueba ubicados en `cypress/e2e/`, limpia los reportes previos y genera un nuevo reporte Allure.

- Para abrir el reporte Allure en tu navegador después de ejecutar las pruebas:
  ```bash
  npm run open-report
  ```
  Esto abrirá una ventana del navegador mostrando el reporte generado.

- También puedes ejecutar los scripts individuales según lo necesites (ver sección de scripts disponibles).


## 🛠️ Scripts disponibles

- `🧹 npm run clean-report` — Elimina los reportes anteriores de Allure.
- `🧪 npm run execute-tests` — Ejecuta las pruebas con Cypress.
- `📊 npm run generate-report` — Genera el reporte Allure a partir de los resultados.
- `🌐 npm run open-report` — Abre el reporte Allure en el navegador.
- `⚡ npm test` — Limpia reportes, ejecuta pruebas y genera el reporte Allure en un solo comando.


## 📁 Estructura del proyecto

- `📝 cypress/e2e/` — Contiene los archivos de pruebas automatizadas.
- `📂 cypress/fixtures/` — Archivos de datos de prueba (fixtures).
- `🔧 cypress/support/` — Comandos personalizados y configuración adicional para Cypress.


## 📑 Reportes

Los reportes Allure se generan automáticamente en la carpeta `allure-report` después de ejecutar las pruebas. Además, pueden ser publicados automáticamente en GitHub Pages para su consulta en línea.

---


🤖 Automatización Grupo 7 — Xacademy