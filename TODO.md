# TODO - Mejoras Pendientes

Lista de mejoras técnicas y refactorizaciones identificadas para futuras iteraciones.

## 🔴 Prioridad Alta

### 1. Arreglar Errores de TypeScript en Tests (68 errores)

**Problema**: Los tests no pasan la verificación de tipos con `npm run type-check` debido a configuraciones estrictas de TypeScript.

**Errores principales**:

- Acceso a arrays sin verificación de `undefined` (afecta a: PageService.test.ts, ProjectService.test.ts, ResumeService.test.ts)
- Falta importación de tipos de `@testing-library/jest-dom` (afecta a: HeaderMenu.test.tsx, ResumeMainInfo.test.tsx)

**Opciones de solución**:

#### Opción A: Agregar guards para acceso a arrays

```typescript
// Cambiar de:
expect(result[0].slug).toBe('about-me')

// A:
expect(result[0]?.slug).toBe('about-me')
// O mejor:
expect(result.at(0)?.slug).toBe('about-me')
```

#### Opción B: Crear tsconfig separado para tests

```json
// tsconfig.test.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUncheckedIndexedAccess": false,
    "exactOptionalPropertyTypes": false
  },
  "include": ["src/**/__tests__/**/*", "tests/**/*"]
}
```

#### Opción C: Importar tipos de Jest DOM

```javascript
// En cada archivo de test o en jest.setup.js
import '@testing-library/jest-dom'
```

**Archivos afectados**:

- `src/application/services/__tests__/PageService.test.ts` (3 errores)
- `src/application/services/__tests__/ProjectService.test.ts` (6 errores)
- `src/application/services/__tests__/ResumeService.test.ts` (12 errores)
- `src/components/__tests__/HeaderMenu.test.tsx` (16 errores)
- `src/components/__tests__/ResumeMainInfo.test.tsx` (31 errores)

**Estimación**: 30-60 minutos

---

## 🟡 Prioridad Media

### 2. Limpiar Campo 'featured' No Utilizado

**Problema**: En `src/content/resume.data.ts` línea 60 existe un campo `featured` que no está en el schema de Zod ni se usa en ninguna parte.

```typescript
// Eliminar esto:
content: {
  featured: [
    {
      title: 'Adopted a product-driven mindset',
      description: '...',
      icon: 'product',
    },
  ],
  highlights: [...],
  experience: [...],
}
```

**Archivos afectados**:

- `src/content/resume.data.ts`

**Estimación**: 5 minutos

---

### 3. Revisar Casts y Guards Innecesarios en PDF Generator

**Archivo**: `src/infrastructure/pdf/RoleBasedPdfResumeGenerator.tsx`

**Problema**: En `RoleBasedPdfResumeGenerator.tsx` hay casts y guards redundantes si los datos ya están validados con Zod.

**Ejemplos**:

```typescript
// Línea 186
const blocks = (resume.content.highlights || []) as Highlight[]
// Si resume está validado, || [] es redundante

// Línea 244
const items = (resume.content.experience || []) as Experience[]
// Mismo problema
```

**Archivos afectados**:

- `src/infrastructure/pdf/RoleBasedPdfResumeGenerator.tsx`

**Estimación**: 10 minutos

---

### 4. Eliminar Comentarios de globals.css

**Problema**: Según los estándares del proyecto (CODING_STANDARDS.md), se prefiere código sin comentarios. El archivo `globals.css` tiene comentarios en español (líneas 5-25).

**Opciones**:

- Eliminar comentarios y usar nombres de clases más descriptivos
- Mantenerlos si se considera que CSS es una excepción a la regla

**Archivos afectados**:

- `src/app/globals.css`

**Estimación**: 10 minutos

---

### 5. Actualizar Deprecation Warning de Next.js Lint

**Problema**: `next lint` está deprecated y se eliminará en Next.js 16.

```bash
`next lint` is deprecated and will be removed in Next.js 16.
For new projects, use create-next-app to choose your preferred linter.
For existing projects, migrate to the ESLint CLI:
npx @next/codemod@canary next-lint-to-eslint-cli .
```

**Solución**: Migrar a ESLint CLI antes de actualizar a Next.js 16.

**Estimación**: 15 minutos

---

## 🟢 Prioridad Baja

### 6. Agregar Tests para PDF Generator

**Problema**: El generador de PDF (`RoleBasedPdfResumeGenerator.tsx`) no tiene tests unitarios.

**Solución**: Crear tests que verifiquen:

- Generación correcta del PDF
- Manejo de errores
- Paginación correcta
- Contenido del PDF

**Archivos a crear**:

- `src/infrastructure/pdf/__tests__/RoleBasedPdfResumeGenerator.test.tsx`

**Estimación**: 2-3 horas

---

### 7. Ampliar Tests E2E

**Problema**: Los tests E2E actuales son básicos. Faltan casos de uso importantes.

**Tests sugeridos**:

- Descarga de PDF funciona correctamente
- Cambio de tema (light/dark) persiste
- Navegación móvil completa
- Tests de accesibilidad (a11y) con axe-core
- Tests de rendimiento (Core Web Vitals)

**Archivos a crear/modificar**:

- `tests/e2e/pdf-download.spec.ts` (nuevo)
- `tests/e2e/theme.spec.ts` (nuevo)
- `tests/e2e/accessibility.spec.ts` (nuevo)
- Ampliar `tests/e2e/mobile-menu.spec.ts`

**Estimación**: 3-4 horas

---

### 8. Agregar Pre-commit Hooks

**Problema**: No hay validación automática antes de commits.

**Solución**: Agregar husky + lint-staged para ejecutar:

- Type checking
- Linting
- Tests unitarios (solo archivos modificados)

```json
// package.json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "npm run type-check"]
  }
}
```

**Dependencias a instalar**:

- `husky`
- `lint-staged`

**Estimación**: 30 minutos

---

### 9. Agregar Bundle Size Analysis

**Problema**: No hay forma fácil de analizar el tamaño del bundle.

**Solución**: Agregar script de análisis.

```json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^15.0.0"
  }
}
```

**Estimación**: 15 minutos

---

### 10. Considerar Storybook para Componentes

**Problema**: No hay documentación visual de componentes.

**Beneficios**:

- Desarrollo aislado de componentes
- Documentación interactiva
- Tests visuales

**Estimación**: 4-6 horas (setup + documentar componentes principales)

---

## 📋 Checklist de Implementación

### Prioridad Alta

- [ ] Arreglar 68 errores de TypeScript en tests
  - [ ] PageService.test.ts (3 errores)
  - [ ] ProjectService.test.ts (6 errores)
  - [ ] ResumeService.test.ts (12 errores)
  - [ ] HeaderMenu.test.tsx (16 errores)
  - [ ] ResumeMainInfo.test.tsx (31 errores)

### Prioridad Media

- [ ] Eliminar campo 'featured' no utilizado en resume.data.ts
- [ ] Limpiar casts innecesarios en RoleBasedPdfResumeGenerator.tsx
- [ ] Decidir sobre comentarios en globals.css
- [ ] Migrar de `next lint` a ESLint CLI

### Prioridad Baja

- [ ] Agregar tests para PDF Generator
- [ ] Ampliar tests E2E
- [ ] Configurar pre-commit hooks
- [ ] Agregar bundle analysis
- [ ] Evaluar necesidad de Storybook

---

## 📊 Métricas Actuales

| Aspecto            | Estado         | Notas               |
| ------------------ | -------------- | ------------------- |
| Tests TypeScript   | ❌ 68 errores  | Prioridad alta      |
| ESLint             | ✅ 0 errores   | Perfecto            |
| Cobertura de tests | ⚠️ Parcial     | Falta PDF generator |
| Documentación      | ✅ Excelente   | Muy completa        |
| Bundle size        | ❓ Desconocido | Agregar análisis    |

---

## 🎯 Objetivo

Llegar a:

- ✅ 0 errores de TypeScript
- ✅ Cobertura de tests > 80%
- ✅ Bundle size monitoreado
- ✅ CI/CD con validación automática

---

**Última actualización**: 2025-10-15
