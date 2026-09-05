# CLAUDE.md

Este archivo proporciona indicaciones a Claude Code (claude.ai/code) al trabajar con código en este repositorio.

@AGENTS.md

## Comandos

- `npm run dev` — inicia el servidor de desarrollo
- `npm run build` — build de producción
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- `npm run drizzle:seed` — llena la base de datos con datos semilla (ejecuta `src/db/seed` vía `tsx`)
- `npx drizzle-kit generate` / `npx drizzle-kit migrate` — genera/aplica migraciones (config en `drizzle.config.ts`, schema en `src/db/schema`, salida en `drizzle/`)

No hay un test runner configurado en este repo.

## Arquitectura

Next.js (App Router) + Drizzle ORM (Postgres) + better-auth, organizado como una app dividida por features (feature-sliced).

**Dos árboles paralelos:**
- `app/` — solo rutas (pages, layouts, route handlers bajo `app/api/**`). Los route handlers son delgados y delegan hacia `src/features/**/actions`.
- `src/features/<feature>/` — la lógica real de cada dominio (`clases`, `teachers`, `students`, `tasks`, `examenes`, `attendance`, `anuncios`, `mis-clases`, `notifications`, `home`, `auth`). Cada feature típicamente contiene:
  - `actions/` — funciones `'use server'`; la única capa autorizada a llamar `requireAuth()` y hacer autorización/validación. Son las que los componentes cliente importan y llaman directamente (no hay una capa de API separada para la mayoría de los CRUD).
  - `services/` — un `*Service` (lógica de negocio) respaldado por un `*Repository` (queries crudas de Drizzle, exportado como una interfaz + instancia singleton, ej. `IClasesRepository` / `clasesServices`). Los services dependen de los repositories; las actions dependen de los services. Mantén las queries a la BD fuera de actions/componentes.
  - `schemas/` o `schema/` — schemas de validación Zod (el nombre de la carpeta es inconsistente entre features — revisa antes de agregar archivos nuevos).
  - `types/` — tipos TS locales a la feature, a menudo derivados del schema de Drizzle (`*InsertType`, `*SelectType`) y de las formas de resultados de queries con joins.
  - `components/`, `store/` (Zustand) — UI y estado de cliente, propios de cada feature.
- `src/shared/` — piezas reutilizables entre features: `components/ui` (primitivas shadcn/radix), `components/form`, `components/table` (TanStack Table), `components/dashboard`, además de `helpers/`, `utils/`, `providers/`, `store/`.
- `src/db/` — configuración de Drizzle: `schema/` (un archivo por tabla, todos re-exportados desde `schema/index.ts`), `relations/relations.ts` (configuración de relaciones de Drizzle usada por `db.query.*`), `seed/`.
- `src/lib/` — `auth.ts` (instancia server de better-auth, adaptador Drizzle sobre `auth-schema`, plugin admin, `role` en el usuario), `auth-server.ts` (`requireAuth()` / `getServerSession()`, usado en server actions), `auth-client.ts`.

**Patrón de autenticación/autorización:** no hay protección de rutas basada en middleware. Cada server action que muta datos llama a `requireAuth()` y valida manualmente `session.user.role` (ej. `'admin'`) antes de continuar, devolviendo `{ success: false, message: '...' }` si falla. Sigue este patrón para nuevas actions en lugar de introducir un mecanismo de auth distinto.

**Flujo de datos típico de una feature:** componente cliente → server action (`'use server'`) → `safeParse` de Zod → método del Service → Repository (query de Drizzle contra `src/db/schema`) → resultado tipado de regreso. Los repositories suelen hacer joins de varias tablas y dar forma a los resultados en tipos combinados propios de la feature, en lugar de devolver filas crudas de las tablas.

**Alias de rutas:** `@/*` apunta a la raíz del repo (ver `tsconfig.json`), por lo que los imports usan `@/src/...` o `@/app/...`.

**Stack de UI:** Tailwind v4, shadcn (`components.json`), primitivas Radix/base-ui, `react-hook-form` + `@hookform/resolvers` + Zod para formularios, `react-select`, `nuqs` para estado en la URL, `zustand` para estado de cliente, `pusher`/`pusher-js` para tiempo real, `uploadthing` para subida de archivos, `react-hot-toast` para notificaciones.

Nota de idioma: los textos de UI, mensajes de formularios y muchos identificadores (slugs como `maestros`, `clases`, `tareas`) están en español — respeta el idioma y nomenclatura existentes al agregar código a una feature en lugar de cambiar a inglés a mitad de archivo.
