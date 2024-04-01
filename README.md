# XY-Tasks Frontend

Este repositorio contiene el frontend para la aplicación XY-Tasks, una plataforma de gestión de tareas desarrollada con Vue.js y otras tecnologías.

XY-Tasks permite a los usuarios administrar sus tareas de manera efectiva. Con esta aplicación, los empleados de una empresa pueden crear, asignar y dar seguimiento a tareas de forma colaborativa.

## Características

- **Registro de empleados mediante un administrador. Ninguna persona externa a la empresa podrá crear un usuario para darse de alta en la plataforma.**
- **Función para restablecer contraseñas olvidadas de los usuarios.**
- **Los empleados pueden cambiar el estado de sus tareas personales y ver los estados de las de sus compañeros para así poder tener un seguimiento en tiempo real de las tareas en cuestión.**
- **Las tareas pueden asignarse a empleados específicos para una mejor organización.**
- **Permite a los usuarios realizar un seguimiento del progreso de sus tareas y colaborar con otros miembros del equipo a través de la sección de comentarios en cada tarea.**
- **El usuario que creó el comentario o el que tiene asignada la tarea en la cual se comenta son los únicos que pueden borrar los comentarios.**
- **En los comentarios se pueden añadir fotos y archivos para ayudarse entre compañeros.**
- **Los administradores tienen acceso a todo lo antes mencionado y más.**
- **Los administradores pueden crear archivos PDF en los cuales visualizar las tareas que se completaron en un rango específico de tiempo y cuanto se tardaron en completarse.**

## Tecnologías Utilizadas

- Vue.js: Framework de JavaScript para construir interfaces de usuario interactivas.
- Vuex: Biblioteca de gestión de estado para Vue.js.
- Vue Router: Enrutador oficial de Vue.js para la creación de aplicaciones de página única (SPA).
- Axios: Cliente HTTP basado en promesas para realizar solicitudes AJAX.
- SweetAlert2: Biblioteca para mostrar alertas personalizadas en Vue.js.
- Tailwind CSS: Framework de diseño CSS para crear interfaces modernas y receptivas.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/XY-Tasks-front.git
   ```

2. **Ve al directorio del proyecto:**

   ```bash
   cd XY-Tasks-front
   ```

3. **Instala las dependencias:**

   ```bash
   npm install
   ```

4. **Copia el archivo .env.example y renómbralo como .env. Luego, configura las variables de entorno necesarias según tu configuración. Agrega la URL de la API de XY-Tasks en la variable de entorno `VUE_APP_API_URL`.**

5. **Inicia el servidor de desarrollo:**

   ```bash
   npm run serve
   ```

6. **Abre tu navegador y visita [http://localhost:8080](http://localhost:8080) para ver la aplicación en acción.**

## ¡Listo!

Ahora puedes comenzar a utilizar XY-Tasks y gestionar tus tareas de forma eficiente.

Si tienes alguna pregunta o encuentras algún problema, no dudes en ponerte en contacto con Boris Manzano para que pueda ayudarte.

¡Gracias y espero que disfrutes XY-Tasks!
