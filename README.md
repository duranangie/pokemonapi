# Pokémon API Web App

Este proyecto consiste en crear un pokedex con funciones de JavaScript que interactúan con una API remota para realizar operaciones de crear actualizar. Estas funciones se utilizan para conectarse a la API y realizar operaciones en la base de datos data.json.

![image](https://github.com/duranangie/cambiador/assets/117625258/c1f80323-52d2-48e9-a404-0efbb58686e4)

## Características

- **Lista de Pokémon**: Muestra una lista de nombres de Pokémon obtenidos de la API de Pokémon.

- **Detalles de Pokémon**: Al hacer clic en un Pokémon, se muestra información detallada, incluyendo estadísticas y una imagen.

- **Ajuste de estadísticas**: Puedes ajustar las estadísticas de un Pokémon utilizando controles deslizantes.

- **Guardar cambios**: Puedes guardar los cambios en la API mock presionando el botón "Guardar".

## Tecnologías Utilizadas

- HTML
- CSS
- JavaScript (con el uso de módulos ES6)
- Fetch API para hacer solicitudes HTTP
- SweetAlert2 para mostrar ventanas modales amigables al usuario
- Json

## Instalación

Para configurar y ver esta página web localmente, sigue estos pasos:

1. Clona este repositorio o crea una nueva carpeta para tu proyecto.

2. Si creas una nueva carpeta y no clonas el repositorio copia el código HTML, CSS y JavaScript proporcionado en archivos separados con los nombres `index.html`, `style.css` y `main.js`, respectivamente. Luego ejecuta el comando `npm init -y` para crear el archivo `package.json` y agrega la linea de codigo `"dev": "json-server --watch data.json "` al `scripts` luego continua con la [configuración](#configuración)

3. Abre el archivo `index.html` en tu navegador web para ver la página web localmente.
## Configuración


1. Clone este repositorio en su máquina local:

        `git clone https://github.com/duranangie/pokemonapi.git`


2. Navegue hasta la carpeta del repositorio:

       ` cd pokemonapi`

3. Abra el archivo `index.html` en su navegador web.
El proyecto contiene un archivo `package.json` en el que estan las dependencias necesarias para ejecutar el servidor JSON utilizado para almacenar los datos de los pokemos en la base de datos o API remota. Asegúrese de tener Node.js instalado y luego ejecute en el terminal el siguiente comando para instalar las dependencias:

       ` npm -E -D install json-server`

4. Luego, puede iniciar el servidor JSON simulado ejecutando:

        `npm run dev`


## Cómo Usar

1. Abre `index.html` en tu navegador web.

2. Verás una lista de nombres de Pokémon.

3. Haz clic en el nombre de un Pokémon para ver más detalles.

4. En la ventana emergente de detalles, puedes ajustar las estadísticas utilizando los controles deslizantes.

5. Presiona el botón "Guardar" para guardar los cambios en la API mock.

6. Si no deseas realizar cambios, presiona el botón "Cancelar" para seleccionar otro Pokémon.

## Desarrollo.

- La aplicación utiliza la API de Pokémon para obtener la lista de nombres de Pokémon y detalles de cada Pokémon.

- Los detalles de Pokémon se muestran en una ventana emergente amigable al usuario con controles deslizantes para ajustar estadísticas.

- Los cambios se envían a la API remota proporcioada por el servidos json utilizando solicitudes HTTP (POST o PUT) para crear o actualizar Pokémon.

## Aplicacion 

![image](https://github.com/duranangie/cambiador/assets/117625258/b3a7b5d5-bec5-48d7-93c0-bdb445072b6e)

![image](https://github.com/duranangie/cambiador/assets/117625258/35a19fb7-2905-4cbd-8888-17bf2ecb8be6)