# DGII Frontend

Este es el proyecto frontend para la prueba técnica de la DGII. Está desarrollado en React utilizando Vite como herramienta de construcción, junto con varias otras dependencias para la gestión del estado, la manipulación de formularios y las solicitudes HTTP.

## Video demostrativo de la página web

Mire el video de demostración de la aplicación aquí: [Demostración de la Aplicación](https://youtu.be/587ASD0pMWE)

## Diseño
![image](https://github.com/user-attachments/assets/a650a0b4-70f3-4f00-bea8-f68258ed7403)

![image](https://github.com/user-attachments/assets/3c10dfee-e38c-44f9-a552-61bbf29bc5c3)




## Requisitos Previos

Antes de comenzar, asegúrese de tener instalados los siguientes programas en su máquina:

- [Git](https://git-scm.com/) para el control de versiones.
- [Node.js](https://nodejs.org/) para la ejecución de JavaScript en el servidor y la gestión de dependencias.
- [npm](https://www.npmjs.com/) (se instala junto con Node.js) para gestionar los paquetes de JavaScript.

## Instalación

1. **Clonar el Repositorio**

   Clone este repositorio en Visual Studio Code dentro de su máquina local usando el siguiente comando:

   ```bash
   git clone https://github.com/EstefaniSoto/FrontEnd-DGII.git
2. **Navegue al directorio del proyecto:**
 ```bash
 cd FrontEnd-DGII
```
3. Instale las dependencias:
 ```bash
npm install
```
 
4. Configure las variables de entorno:

Cree un archivo .env en el directorio raíz del proyecto y añada la siguiente línea:
 ```bash
VITE_API_BASE_URL=http://localhost:5054/api
```
Ejecución del Proyecto
Para iniciar el servidor de desarrollo, ejecute el siguiente comando:
```bash
npm run dev
```
El proyecto se abrirá en el navegador en [http://localhost:5173](http://localhost:5173) por defecto. **IMPORTANTE:** El proyecto debe ejecutarse en esta URL específicamente, ya que los permisos de CORS para la API están configurados para permitir solicitudes solo desde [http://localhost:5173](http://localhost:5173).

## Pruebas

Para ejecutar las pruebas, utilice el siguiente comando:
```bash
npm test
```
Las pruebas están configuradas para ejecutarse en un entorno de jest con jsdom.

## Tecnologías Utilizadas

- **React:** Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite:** Herramienta de construcción rápida.
- **Tailwind CSS:** Framework CSS para diseño rápido y responsivo.
- **Axios:** Biblioteca para realizar solicitudes HTTP.
- **SweetAlert2:** Librería para mostrar alertas estilizadas.
- **Jest:** Framework de pruebas para JavaScript.
