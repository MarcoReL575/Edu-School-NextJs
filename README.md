# Edu School

Plataforma escolar web para la gestión académica de un colegio: clases, tareas, exámenes, asistencia, anuncios y notificaciones en tiempo real, con roles diferenciados para administradores, maestros, estudiantes y tutores.

## Funcionalidades

- **Clases** — creación y administración de clases y horarios.
- **Tareas** — asignación de tareas, entrega y seguimiento.
- **Exámenes** — creación de exámenes y asignación a estudiantes.
- **Asistencia** — registro y consulta de asistencia por clase.
- **Anuncios** — comunicados generales dentro de la plataforma.
- **Notificaciones en tiempo real** — vía Pusher, para tutores y estudiantes (nuevas tareas, exámenes asignados, etc.).
- **Tutores** — vista dedicada con estadísticas, horarios y asistencia de sus hijos.
- **Autenticación y roles** — sesiones y control de acceso por rol (admin, maestro, estudiante, tutor) con better-auth.

## Stack técnico

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Base de datos**: PostgreSQL + [Drizzle ORM](https://orm.drizzle.team)
- **Autenticación**: [better-auth](https://www.better-auth.com)
- **UI**: Tailwind CSS v4, componentes shadcn/Radix
- **Formularios**: react-hook-form + Zod
- **Estado de cliente**: Zustand, nuqs (estado en la URL)
- **Tiempo real**: Pusher
- **Subida de archivos**: UploadThing
- **Tablas**: TanStack Table

## Arquitectura

El proyecto está organizado por features (feature-sliced):

- `app/` — rutas de Next.js (pages, layouts, route handlers), delgadas y delegando la lógica a `src/features`.
- `src/features/<feature>/` — lógica de cada dominio (`clases`, `teachers`, `students`, `tasks`, `examenes`, `attendance`, `anuncios`, `notifications`, `parents`, etc.), cada una con sus `actions`, `services`, `schemas`, `types` y `components`.
- `src/shared/` — componentes y utilidades reutilizables entre features.
- `src/db/` — schema, relaciones y seed de Drizzle.
- `src/lib/` — configuración de autenticación (`better-auth`).

Para más detalle sobre las convenciones del proyecto, revisa [`CLAUDE.md`](./CLAUDE.md).

## Requisitos previos

- Node.js 20+
- Una base de datos PostgreSQL
- Variables de entorno configuradas (ver `.env.example` si existe, o las requeridas por `drizzle.config.ts` y `src/lib/auth.ts`)

## Primeros pasos

Instala las dependencias:

```bash
npm install
```

Aplica las migraciones de base de datos:

```bash
npx drizzle-kit migrate
```

(Opcional) Llena la base de datos con datos de prueba:

```bash
npm run drizzle:seed
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Inicia el servidor en modo producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run drizzle:seed` | Llena la base de datos con datos semilla |
| `npx drizzle-kit generate` | Genera nuevas migraciones a partir del schema |
| `npx drizzle-kit migrate` | Aplica las migraciones pendientes |

> No hay un test runner configurado en este repositorio.
