# Soportech ICT — Astro estático

## Desarrollo y validación

Node 22.12+ o 24. `npm ci`, `npm run dev`. Para preparar una publicación:

```
npm run release
npx astro check
```

`release` construye `dist`, comprueba rutas, metadatos, enlaces, aislamiento de silos, sitemap y redirecciones, y copia el resultado a la raíz. La raíz conserva el modo de publicación existente de GitHub Pages desde `main`; no requiere cambiar DNS, dominio, permisos ni la fuente de Pages. Los archivos generados en raíz se revisan en el mismo PR que `src/`. No editar el HTML generado a mano.

## Arquitectura

- `/`: portada neutral. `LocalBusiness`.
- `/empresas/soporte-tecnico/`: B2B. `LocalBusiness` + `ProfessionalService`, y `Service`.
- `/reparacion-computadoras/`: hogar. `LocalBusiness` y `Service` con `serviceType: ComputerRepair`.

El vocabulario oficial de Schema.org no define `ComputerRepair` como tipo. Se conserva como etiqueta del servicio en lugar de inventar un `@type`. `ProfessionalService` existe pero está obsoleto; se incluye por el requisito del proyecto junto con `LocalBusiness`. No se inventan dirección, calificaciones ni reseñas. No se promete elegibilidad para resultados enriquecidos sin los datos requeridos.

La navegación del silo solo enlaza a sus secciones y al inicio mediante el logo. No hay enlaces directos entre B2B y B2C. Los planes y sus condiciones comerciales publicadas se conservan en B2B; la calculadora funciona progresivamente sobre precios ya renderizados para 5 equipos.

Se conserva la composición visual publicada, sus estilos, fotografías, logo, formulario de correo y el catálogo de precios para particulares (IVA incluido) con sus condiciones. El catálogo del hogar excluye referencias a servicios del otro silo.

Los bloques originales se distribuyen por intención: Inicio conserva portada fotográfica y tarjetas de acceso; Empresas conserva las ocho tarjetas de servicios con iconos y efectos hover, mesa de ayuda, orientación inicial, modalidades, calculadora con botones rápidos, proceso, presentación de la empresa, preguntas frecuentes y banda de contacto; Hogar conserva precios, condiciones y orientación, con tarjetas del mismo sistema visual. Los enlaces de cada tarjeta seleccionan el servicio correspondiente en el formulario. Se respetan preferencias de movimiento reducido.

## WhatsApp y atribución

`src/lib/site.ts` centraliza el número y los textos. Cada enlace lleva `silo` y `ubicacion` dentro del mensaje prellenado. El visitante puede modificarlo; no equivale a una conversión confirmada. Se emite el evento de navegador `soportech:conversion` al hacer clic, con canal, silo, ubicación y ruta. No se carga un proveedor de analítica sin configurar uno. Los UTM de campañas entrantes no se almacenan y no se presume que `wa.me` mida UTM.

## URLs anteriores

`/particulares/` pasa a `/reparacion-computadoras/`; `/soporte-ti-empresas-zmg/` y `/soporte-tecnico-empresas-guadalajara/` pasan a `/empresas/soporte-tecnico/`. GitHub Pages estático entrega páginas de redirección con meta refresh inmediato, canonical y enlace accesible. **No son respuestas HTTP 301**. Para 301 reales se necesita una capa HTTP con reglas de redirección delante de Pages o migrar alojamiento. No se incluyen reglas `_redirects` que Pages ignoraría. Las URLs antiguas se excluyen del sitemap.

## Despliegue y reversión

Revisar PR contra `soportechictgdl-ui/soportech-ict:main`. Fusionar únicamente con build, validación y revisión visual correctos. El commit conserva los artefactos necesarios para publicar sin ejecutar Astro en Pages. Conservar CNAME y `.nojekyll`. Comprobar HTTPS, rutas, assets y redirecciones después del despliegue. Revertir el commit de migración mediante un PR si se necesita volver a la versión anterior.

## SEO después de publicar

Con acceso a la propiedad `soportechict.com` en Search Console: enviar sitemap, inspeccionar las tres rutas nuevas y solicitar indexación; revisar el canonical elegido por Google y la evolución de indexación. Medir LCP, INP y CLS con datos de campo cuando exista volumen suficiente. Las pruebas locales de Lighthouse no garantizan resultados de campo ni posicionamiento.
