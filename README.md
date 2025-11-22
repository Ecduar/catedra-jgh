# Cátedra Dr. José Gregorio Hernández - Sistema de Gestión Académica

La aplicación permite a los administradores inscribir estudiantes, ver el listado de inscritos, editar la información existente y eliminar registros. El diseño está inspirado en una estética académica y sobria, utilizando una paleta de colores personalizada sin el uso de librerías de estilos externas (como Bootstrap o Tailwind).

## Tecnologías Utilizadas

- **ReactJS:** Librería principal para la construcción de la interfaz de usuario basada en componentes.
- **JavaScript (ES6+):** Lógica de control y manipulación del estado.
- **HTML5 Semántico:** Estructura del documento (`<header>`, `<main>`, `<section>`, `<article>`).
- **CSS3:** Estilos personalizados, uso de _Custom Properties_ (Variables CSS) y diseño **Responsive** mediante Media Queries y CSS Grid.
- **LocalStorage API:** Para la persistencia de datos del lado del cliente.

## Cumplimiento de Objetivos

Este desarrollo cumple con los siguientes requerimientos académicos:

1.  **CRUD con LocalStorage:** \* Se utiliza el hook `useEffect` para sincronizar el estado de la aplicación con el almacenamiento local del navegador, garantizando que los datos no se pierdan al recargar la página.
2.  **Manipulación del DOM con React:** \* Se evita la manipulación imperativa directa (`document.getElementById`). En su lugar, se utiliza el **Estado (useState)** para renderizar dinámicamente los elementos en el DOM virtual.
3.  **Diseño Personalizado (Sin Plantillas):**
    - Todo el CSS fue escrito desde cero. Se implementó un diseño fluido que se adapta a dispositivos móviles (apilamiento de columnas) y escritorio (diseño de grilla).
4.  **Sintaxis y Buenas Prácticas:**
    - Código modular separado en lógica (`App.jsx`) y estilos (`App.css`).
    - Uso de funciones de flecha y desestructuración de objetos.

## Instalación y Ejecución

Sigue estos pasos para correr el proyecto en tu entorno local:

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    ```

2.  **Instalar dependencias:**
    Navega a la carpeta del proyecto e instala los módulos de node:

    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

4.  **Visualizar:**
    Abre tu navegador en la dirección que muestra la terminal (usualmente `http://localhost:5173/` o `http://localhost:3000/`).

## Participantes

Ecduar Estrada – [@ecduar](https://github.com/Ecduar)
José Manuel Montilla - [@danyer1234567](https://github.com/danyer1234567)

```

```
