# GoPass Project Management System

Este es el cliente web para GoPass project manager system, una aplicación robusta de gestión de proyectos y tareas diseñada para optimizar el flujo de trabajo personal o de equipos. Construida con un enfoque en la experiencia de usuario (UX) fluida y una arquitectura moderna.

---

## Stack Tecnológico
- **Framework:** React JS (con Vite)  
- **Lenguaje:** TypeScript  
- **Estilos:** Tailwind CSS  
- **UI Components:** shadcn/ui (basado en Radix UI)  
- **Gestión de Estado & Consultas:** TanStack Query (React Query)  
- **Iconos:** Lucide React  
- **Arrastre y Soltar:** @dnd-kit  

---

## Configuración e Instalación

### Requisitos Previos
- Node.js (versión 18 o superior)
- npm o pnpm

### Pasos
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/ArnuelGM/gopass-project-manager-frontend.git
   cd gopass-project-manager-frontend
2. **Instala las dependencias:**
   ```bash
   npm install
   o
   pnpm install
3. **Configura las variables de entorno:**

    Crea un archivo .env en la raíz del proyecto o edita el archivo de ejemplo incluido en el repositorio:
   ```bash
   VITE_API_BASE_URL=http://localhost:3000
4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   o
   pnpm dev
## Guía de Usuario
### Dashboard de Proyectos
- **Al ingresar:** Serás recibido por el Dashboard Principal con todos tus proyectos activos.

- **Creación:** Usa el botón "Add New Project" para abrir un diálogo y dar nombre y descripción a tu nueva iniciativa.

- **Navegación:** Haz clic en cualquier tarjeta de proyecto para ver detalles y tareas.

- **Gestión:** Dentro de la vista de detalle, podrás Editar (nombre/descripción) o Eliminar el proyecto mediante diálogos de confirmación.

### Gestión de Tareas

Cada proyecto es un ecosistema independiente de tareas con propiedades como Título, Descripción, Prioridad (Low a Urgent), Estado y Fecha Estimada de Finalización.

#### Vistas de Tareas

- **List View:** Tabla organizada para lectura rápida y lineal.

- **Board View (Kanban):** Tablero con columnas por estado. Usa Drag & Drop para mover tareas entre estados (To Do, In Progress, Done, etc.).

#### Acciones con Tareas

- **Crear:** Diálogo especializado que permite definir prioridad y fecha desde el inicio.

- **Ver Detalle:** Al hacer clic en una tarea, se despliega un Sheet lateral con toda la información.

- **Editar In-line:** En la vista de detalle, edita título, descripción o fecha haciendo clic sobre ellos. Los cambios se guardan solo cuando lo decidas.

- **Eliminar:** Opción disponible para descartar tareas innecesarias.

## Próximos Pasos & Mejoras Sugeridas

Este proyecto es una base sólida, pero siempre se puede ir más allá. Algunas ideas para futuras versiones:

### Colaboración

- Sistema de autenticación y perfiles de usuario.
- Asignación de tareas a miembros específicos del equipo.
- Sección de comentarios dentro del detalle de cada tarea para feedback en tiempo real.

### Gestión de Recursos

- Carga de archivos adjuntos (documentos, imágenes de referencia) directamente en la tarea.

### Análisis y Datos

- **Dashboard de Estadísticas:** Gráficos (Pie/Bar charts) que muestren productividad, tareas por usuario y porcentaje de tareas bloqueadas vs. completadas.

### Notificaciones
- Alertas cuando una tarea está próxima a su fecha de vencimiento.
      
---
> Desarrollado por Arnuel Gutiérrez Menco 2026/04/29