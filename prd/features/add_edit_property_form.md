Un formulario de administración premium para la creación y edición de propiedades de lujo, con persistencia real en Supabase y una estética editorial sofisticada.

**DESIGN SYSTEM (REQUIRED):**
- **Platform:** Web (Next.js 16 / React 19), Desktop-first Dashboard.
- **Theme:** Light/Premium Backoffice, minimalista con espacios generosos.
- **Background:** Clear Day (#EEF6F6) para el canvas, Blanco (#FFFFFF) para tarjetas de formulario.
- **Primary Accent:** Luxe Green (#06f9d0) para acciones principales y estados de éxito.
- **Functional Accent:** Mosque (#006655) para elementos activos, toggles y hover states.
- **Text Primary:** Nordic Dark (#19322F) para encabezados y etiquetas de alta jerarquía.
- **Text Secondary:** Nordic Muted (#5C706D) para textos de ayuda y placeholders.
- **Borders & Shapes:** Bordes sutiles con radio de 0.5rem (default) a 1rem (lg). Sombras suaves para elevación de secciones.

**ESTRUCTURA DE LA PÁGINA (Page Structure):**
1. **Header Administrativo:** Título dinámico ("Nueva Propiedad" / "Editar [Nombre]"), migas de pan (breadcrumbs) y botón de retorno al listado.
2. **Sección de Información Básica:** Campos de texto para `title`, `description` (rich text simple) y generación automática de `slug`.
3. **Sección de Detalles Técnicos:** Grid layout para `price` (formato moneda), `address`, `beds`, `baths`, `sqft`, `type` (select) y `status` (select).
4. **Selector de Amenities:** Componente de selección múltiple (chips/tags) basado en los valores reales de la base de datos.
5. **Galería de Medios Interactiva:** Área de carga/gestión de imágenes con previsualización en miniatura y soporte para URLs de Supabase Storage.
6. **Panel de Publicación/Estado:** Toggles para `is_featured`, `is_exclusive`, `is_new_arrival`.
7. **Barra de Acciones (Footer/Sticky):** Botón primario "Save Property", secundario "Save Draft" y enlace de cancelación.

**ESPECIFICACIONES TÉCNICAS Y CONTEXTO:**
- **Rutas:** `app/dashboard/properties/new/page.tsx` y `app/dashboard/properties/[id]/edit/page.tsx`.
- **Persistencia:** Integración obligatoria con la tabla `properties` de Supabase mediante **Server Actions**.
- **Lógica de Edición:** Precarga de datos (fetching) en el lado del servidor para el formulario de edición.
- **Validación:** Implementación de validaciones de lado del servidor y cliente (Zod/React Hook Form recomendados) con mensajes de error claros.
- **Arquitectura:** Componente de formulario reutilizable que abstrae la lógica de mutación.

**RESTRICCIONES:**
- Prohibido el uso de Mock Data; la conexión con `lib/supabase.ts` debe ser funcional.
- No introducir nuevas columnas en la base de datos sin una justificación técnica crítica.
- La experiencia debe ser coherente con el Dashboard existente, manteniendo el nivel visual de las pantallas orientadas al cliente.

---
💡 **Tip:** Para mantener la consistencia en el diseño de componentes administrativos, consulta el archivo `components.json` y la carpeta `components/ui` (shadcn).
