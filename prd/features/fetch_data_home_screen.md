**Objetivo:** Implementar la integración de datos dinámicos desde Supabase en la página de inicio (`app/page.tsx`) para las secciones de propiedades destacadas y novedades del mercado.

**SISTEMA DE DISEÑO (REQUERIDO):**
- **Framework:** Next.js 16 (App Router) con React 19.
- **Estilo:** Tailwind CSS 4.
- **Paleta de Colores:** 
    - Principal: `#06f9d0` (Primary)
    - Acento: `#006655` (Mosque)
    - Fondos: `#EEF6F6` (Light) / `#0f231f` (Dark)
    - Texto: `#19322F` (Nordic Dark)
- **Componentes:** Utilizar la estructura existente de RSC (React Server Components) por defecto.
- Utliza la imagen @/prd/resource/home_discover_screen/screen.png como referencia para el diseño final.
- Utiliza la skill @shadcn para identificar qué componentes debes instalar.

**ESPECIFICACIONES TÉCNICAS Y ESTRUCTURA:**

1. **Conexión a Datos:**
    - Utilizar el cliente de Supabase configurado en el proyecto (referencia: `.env.local`).
    - Realizar las peticiones directamente desde Server Components para optimizar el SEO y la carga inicial.

2. **Sección "Featured Collections" (Colecciones Destacadas):**
    - **Lógica:** Seleccionar exactamente 2 propiedades de la base de datos de forma aleatoria en cada carga.
    - **UI:** Renderizar utilizando el componente `PropertyCard` existente.

3. **Sección "New in Market" (Novedades en el Mercado):**
    - **Lógica:** Implementar paginación del lado del servidor en lotes de 8 propiedades.
    - **Orden:** Clasificar por fecha de creación descendente (más recientes primero).
    - **Interacción:** Asegurar que los controles de paginación mantengan el estado visual del sistema.

4. **Optimización de Imágenes y Rendimiento:**
    - **Mecanismo de Caché:** Implementar una estrategia de caché para las imágenes de las propiedades (ej. `next/image` con configuración de `deviceSizes` o `imageSizes` y TTL definido) para minimizar el consumo de ancho de banda y latencia de red.
    - **Restricción:** No utilizar datos de prueba (mock data); la UI debe reflejar exclusivamente el estado actual de la base de datos.
