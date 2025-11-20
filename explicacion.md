# 📋 DOCUMENTACIÓN COMPLETA - SISTEMA AGROCARE COLOMBIA

## 📖 Índice

1. [Introducción](#introducción)
2. [¿Qué es AgroCare?](#qué-es-agrocare)
3. [Estructura General del Sistema](#estructura-general-del-sistema)
4. [Componentes Principales](#componentes-principales)
5. [Clases de Información (Datos)](#clases-de-información-datos)
6. [Gestores (Administradores)](#gestores-administradores)
7. [Relaciones entre Componentes](#relaciones-entre-componentes)
8. [Validaciones y Restricciones](#validaciones-y-restricciones)
9. [Flujo Lógico del Sistema](#flujo-lógico-del-sistema)
10. [Persistencia de Datos](#persistencia-de-datos)
11. [Interfaz de Usuario](#interfaz-de-usuario)

---

## 🌱 Introducción

Este documento explica de manera detallada el funcionamiento del **Sistema AgroCare Colombia**, un programa diseñado para ayudar a pequeños agricultores a llevar un registro organizado de sus cultivos y todas las actividades relacionadas con ellos.

El sistema permite registrar información sobre:

- **Cultivos** (qué se siembra, cuándo y dónde)
- **Riegos** (cuándo y cuánta agua se usa)
- **Fertilizaciones** (qué fertilizantes se aplican y en qué cantidad)
- **Cosechas** (cuánto se recolecta y qué tan productivo fue el cultivo)
- **Reportes** (resúmenes de toda la actividad en un período de tiempo)

---

## 🎯 ¿Qué es AgroCare?

**AgroCare** es un sistema de gestión agrícola que funciona como un **asistente digital** para agricultores. Imagina que es como un cuaderno inteligente que:

1. **Guarda información** sobre tus cultivos
2. **Recuerda** todas las actividades que realizas (riego, fertilización, cosecha)
3. **Calcula automáticamente** datos importantes (como el rendimiento de tus cultivos)
4. **Genera reportes** para que puedas ver cómo va tu producción
5. **Te protege de errores** validando que la información que ingresas tenga sentido

### Objetivo Principal

Facilitar el registro y seguimiento de actividades agrícolas para pequeños productores, permitiéndoles tomar mejores decisiones basadas en datos históricos de sus cultivos.

---

## 🏗️ Estructura General del Sistema

El sistema AgroCare está organizado en **capas** o niveles, como un edificio:

\`\`\`
┌─────────────────────────────────────────┐
│ INTERFAZ DE USUARIO (ProyectoAgroCare)│ ← Lo que ve el usuario
│ Menús y opciones por consola │
├─────────────────────────────────────────┤
│ COORDINADOR (SistemaAgroCare) │ ← Organiza todo
│ Conecta todos los gestores │
├─────────────────────────────────────────┤
│ GESTORES (Administradores) │ ← Lógica de negocio
│ - GestorCultivo │
│ - GestorRiego │
│ - GestorFertilizacion │
│ - GestorCosecha │
│ - GestorReporte │
├─────────────────────────────────────────┤
│ CLASES DE DATOS (Información) │ ← Estructura de datos
│ - Cultivo │
│ - Riego │
│ - Fertilizacion │
│ - Cosecha │
│ - Reporte │
├─────────────────────────────────────────┤
│ UTILIDADES │ ← Herramientas auxiliares
│ - FormateadorDatos │
│ - UnidadFertilizante │
└─────────────────────────────────────────┘
\`\`\`

---

## 🧩 Componentes Principales

### 1. **ProyectoAgroCare** (Clase Principal)

- **¿Qué es?** Es el punto de entrada del programa, donde todo comienza.
- **¿Qué hace?** Muestra los menús en pantalla y recibe las opciones del usuario.
- **Analogía:** Es como el mostrador de un banco donde el cliente (usuario) hace sus solicitudes.

### 2. **SistemaAgroCare** (Coordinador Central)

- **¿Qué es?** Es el cerebro del sistema que coordina todos los componentes.
- **¿Qué hace?**
  - Crea todos los gestores al iniciar
  - Conecta los gestores entre sí para que puedan comunicarse
  - Carga y guarda datos en archivos
- **Analogía:** Es como el gerente de una empresa que coordina a todos los departamentos.

### 3. **Gestores** (Administradores)

Son los encargados de manejar cada tipo de información. Cada gestor es como un departamento especializado.

### 4. **Clases de Datos**

Son las estructuras que definen cómo se organiza la información. Como formularios con campos específicos.

### 5. **Utilidades**

Herramientas auxiliares que ayudan al sistema:

- **FormateadorDatos:** Da formato bonito a la información para mostrarla
- **UnidadFertilizante:** Define las unidades de medida (kg, litros, m³)

---

## 📦 Clases de Información (Datos)

Estas clases definen **qué información** se guarda sobre cada elemento del sistema.

### 🌾 **Cultivo**

Representa un terreno sembrado con un tipo de planta.

**Información que guarda:**

- `id`: Identificador único (como una cédula para el cultivo)
- `tipoPlanta`: Qué se sembró (ej: "Tomate", "Maíz", "Lechuga")
- `fechaSiembra`: Cuándo se sembró (formato: día/mes/año)
- `area`: Tamaño del terreno en metros cuadrados (m²)
- `observaciones`: Notas adicionales (opcional)

**Ejemplo:**
\`\`\`
ID: CULT_1234567890
Tipo: Tomate
Fecha Siembra: 15/01/2024
Área: 100 m²
Observaciones: Terreno con buen drenaje
\`\`\`

---

### 💧 **Riego**

Representa una actividad de riego (regar las plantas con agua).

**Información que guarda:**

- `id`: Identificador único
- `cultivoId`: A qué cultivo pertenece este riego
- `fecha`: Cuándo se realizó (o se realizará) el riego
- `cantidadAgua`: Cuántos litros de agua se usaron
- `esProgramado`: Si es un riego futuro (programado) o ya realizado

**Tipos de riego:**

1. **Riego Ejecutado:** Ya se realizó (fecha pasada o presente)
2. **Riego Programado:** Está planeado para el futuro

**Ejemplo:**
\`\`\`
ID: RIEGO_1234567891
Cultivo: CULT_1234567890
Fecha: 20/01/2024
Cantidad: 50 litros
Tipo: Registro (ya ejecutado)
\`\`\`

---

### 🌿 **Fertilizacion**

Representa la aplicación de fertilizante a un cultivo.

**Información que guarda:**

- `id`: Identificador único
- `cultivoId`: A qué cultivo se le aplicó
- `fecha`: Cuándo se fertilizó
- `tipoFertilizante`: Qué tipo de fertilizante (ej: "Urea", "Compost")
- `cantidad`: Cuánto se aplicó
- `unidad`: En qué unidad se mide (kg, litros, m³)

**Ejemplo:**
\`\`\`
ID: FERT_1234567892
Cultivo: CULT_1234567890
Fecha: 18/01/2024
Tipo: Urea
Cantidad: 5 kg
\`\`\`

---

### 🌽 **Cosecha**

Representa la recolección de productos del cultivo.

**Información que guarda:**

- `id`: Identificador único
- `cultivoId`: De qué cultivo se cosechó
- `fecha`: Cuándo se cosechó
- `cantidad`: Cuántos kilogramos se recolectaron
- `rendimiento`: Productividad (kg/m²) - **se calcula automáticamente**

**Cálculo del Rendimiento:**
\`\`\`
Rendimiento = Cantidad cosechada (kg) ÷ Área del cultivo (m²)
\`\`\`

**Ejemplo:**
\`\`\`
ID: COSECHA_1234567893
Cultivo: CULT_1234567890
Fecha: 15/03/2024
Cantidad: 80 kg
Rendimiento: 0.80 kg/m² (80 kg ÷ 100 m²)
\`\`\`

---

### 📊 **Reporte**

Representa un resumen de todas las actividades de un cultivo en un período de tiempo.

**Información que guarda:**

- `nombreTemporada`: Nombre del período (ej: "Verano 2024")
- `fechaInicio` y `fechaFin`: Rango de fechas del reporte
- `cultivoId`: ID del cultivo
- `tipoPlanta`: Qué se cultivó
- `fechaSiembra`: Cuándo se sembró
- `numeroRiegos`: Cuántas veces se regó
- `litrosUsados`: Total de agua usada
- `numeroFertilizaciones`: Cuántas veces se fertilizó
- `numeroCosechas`: Cuántas veces se cosechó
- `kgCosechados`: Total de kilogramos recolectados
- `rendimientoPromedio`: Promedio de productividad
- `observaciones`: Notas del cultivo

**Ejemplo:**
\`\`\`
REPORTE: Temporada Verano 2024
Período: 01/01/2024 → 31/03/2024
Cultivo: Tomate (CULT_1234567890)

- Riegos: 15 riegos (750 litros)
- Fertilizaciones: 3 aplicaciones
- Cosechas: 2 cosechas (150 kg)
- Rendimiento Promedio: 0.75 kg/m²
  \`\`\`

---

## 🎛️ Gestores (Administradores)

Los gestores son como **departamentos especializados** que se encargan de administrar cada tipo de información. Cada gestor tiene responsabilidades específicas.

### 🌾 **GestorCultivo**

**¿Qué hace?**

- Registra nuevos cultivos
- Actualiza información de cultivos existentes
- Elimina cultivos (y todos sus registros relacionados)
- Busca cultivos por ID
- Lista todos los cultivos
- Valida que los datos sean correctos

**Responsabilidades especiales:**

- Cuando se elimina un cultivo, **automáticamente elimina** todos sus riegos, fertilizaciones y cosechas
- Verifica si un cultivo tiene cosechas antes de permitir editar su fecha o área

**Validaciones que realiza:**

- El tipo de planta no puede estar vacío
- La fecha de siembra no puede ser futura
- El área debe ser mayor a 0
- Si un cultivo tiene cosechas, NO se puede editar su fecha ni área

**¿Por qué estas validaciones?**

- **Fecha futura:** No puedes sembrar algo en el futuro
- **Área > 0:** Un cultivo debe ocupar espacio
- **No editar con cosechas:** Si ya cosechaste, cambiar el área alteraría los cálculos de rendimiento

---

### 💧 **GestorRiego**

**¿Qué hace?**

- Registra riegos ejecutados y programados
- Actualiza información de riegos
- Elimina riegos
- Busca riegos por ID
- Lista todos los riegos
- Valida que los datos sean correctos

**Validaciones que realiza:**

- El cultivo debe existir
- La fecha no puede estar vacía
- La cantidad de agua debe ser mayor a 0
- **Para riegos ejecutados:** La fecha NO puede ser futura
- **Para riegos ejecutados:** La fecha NO puede ser anterior a la siembra del cultivo
- **Para riegos programados:** La fecha DEBE ser futura

**¿Por qué estas validaciones?**

- **Cultivo existente:** No puedes regar algo que no existe
- **Fecha futura para ejecutados:** No puedes registrar algo que aún no ha pasado
- **Fecha anterior a siembra:** No puedes regar antes de sembrar
- **Fecha futura para programados:** Un riego programado es para el futuro

---

### 🌿 **GestorFertilizacion**

**¿Qué hace?**

- Registra fertilizaciones
- Actualiza información de fertilizaciones
- Elimina fertilizaciones
- Busca fertilizaciones por ID
- Lista todas las fertilizaciones
- Valida que los datos sean correctos

**Validaciones que realiza:**

- El cultivo debe existir
- La fecha no puede ser futura
- La fecha no puede ser anterior a la siembra del cultivo
- El tipo de fertilizante no puede estar vacío
- La cantidad debe ser mayor a 0

**¿Por qué estas validaciones?**

- **Fecha no futura:** Solo se registran fertilizaciones ya realizadas
- **Fecha posterior a siembra:** No puedes fertilizar antes de sembrar
- **Tipo no vacío:** Debes especificar qué fertilizante usaste
- **Cantidad > 0:** Debes aplicar algo de fertilizante

---

### 🌽 **GestorCosecha**

**¿Qué hace?**

- Registra cosechas
- Actualiza información de cosechas
- Elimina cosechas
- Busca cosechas por ID
- Lista todas las cosechas
- **Calcula automáticamente el rendimiento** (kg/m²)
- Valida que los datos sean correctos

**Cálculo Automático:**
Cuando registras una cosecha, el sistema automáticamente:

1. Busca el área del cultivo
2. Divide la cantidad cosechada entre el área
3. Guarda el rendimiento calculado

**Validaciones que realiza:**

- El cultivo debe existir
- La fecha no puede ser futura
- La fecha no puede ser anterior a la siembra del cultivo
- La cantidad debe ser mayor a 0

**¿Por qué estas validaciones?**

- **Fecha no futura:** No puedes cosechar algo que aún no ha pasado
- **Fecha posterior a siembra:** No puedes cosechar antes de sembrar
- **Cantidad > 0:** Debes cosechar algo

**Función especial:**

- `existenPorCultivo()`: Verifica si un cultivo tiene cosechas (usado por GestorCultivo)

---

### 📊 **GestorReporte**

**¿Qué hace?**

- Genera reportes de producción por temporada
- Filtra actividades por rango de fechas
- Calcula estadísticas agregadas
- Lista reportes generados
- Busca reportes por nombre de temporada

**Proceso de generación de reportes:**

1. **Recibe parámetros:**
   - Nombre de la temporada (ej: "Verano 2024")
   - Fecha de inicio
   - Fecha de fin

2. **Identifica cultivos relevantes:**
   - Busca todos los cultivos cuya fecha de siembra sea anterior o igual a la fecha fin

3. **Para cada cultivo, filtra actividades:**
   - **Riegos:** Cuenta cuántos riegos hubo en el período y suma los litros
   - **Fertilizaciones:** Cuenta cuántas fertilizaciones hubo
   - **Cosechas:** Cuenta cuántas cosechas hubo, suma los kg y calcula rendimiento promedio

4. **Crea el reporte:**
   - Solo incluye cultivos que tuvieron al menos una actividad en el período
   - Guarda el reporte en la lista de reportes

**Validaciones que realiza:**

- Las fechas no pueden ser nulas
- La fecha de inicio debe ser anterior o igual a la fecha de fin

**Característica importante:**
Los reportes son **fotografías en el tiempo**. Si modificas datos después de generar un reporte, el reporte NO se actualiza automáticamente. Debes generar un nuevo reporte para ver los datos actualizados.

---

## 🔗 Relaciones entre Componentes

El sistema tiene una estructura de **dependencias** donde unos componentes necesitan a otros para funcionar correctamente.

### Diagrama de Relaciones

\`\`\`
SistemaAgroCare
│
┌─────────────────┼─────────────────┐
│ │ │
▼ ▼ ▼
GestorCultivo GestorRiego GestorFertilizacion
│ │ │
│ └─────────┬───────┘
│ │
▼ ▼
GestorCosecha ◄──────────── (Todos necesitan
│ a GestorCultivo)
│
▼
GestorReporte
(necesita a todos)
\`\`\`

### Explicación de las Relaciones

#### 1. **SistemaAgroCare → Todos los Gestores**

- El sistema crea todos los gestores al iniciar
- Establece las conexiones entre ellos
- Coordina la carga y guardado de datos

#### 2. **GestorCultivo → GestorCosecha, GestorFertilizacion, GestorRiego**

- GestorCultivo necesita referencias a los otros gestores para:
  - Eliminar todos los registros relacionados cuando se elimina un cultivo
  - Verificar si un cultivo tiene cosechas antes de permitir ediciones

#### 3. **GestorRiego → GestorCultivo**

- Necesita verificar que el cultivo existe antes de registrar un riego
- Necesita la fecha de siembra para validar que el riego no sea anterior

#### 4. **GestorFertilizacion → GestorCultivo**

- Necesita verificar que el cultivo existe antes de registrar una fertilización
- Necesita la fecha de siembra para validar que la fertilización no sea anterior

#### 5. **GestorCosecha → GestorCultivo**

- Necesita verificar que el cultivo existe
- Necesita el área del cultivo para calcular el rendimiento
- Necesita la fecha de siembra para validar que la cosecha no sea anterior

#### 6. **GestorReporte → Todos los Gestores**

- Necesita acceso a todos los gestores para:
  - Obtener información de cultivos
  - Filtrar riegos, fertilizaciones y cosechas por fecha
  - Calcular estadísticas agregadas

### ¿Por qué estas relaciones?

**Integridad de Datos:** Las relaciones aseguran que:

- No existan riegos, fertilizaciones o cosechas "huérfanos" (sin cultivo)
- Los cálculos sean correctos (ej: rendimiento)
- Las validaciones sean consistentes

**Eliminación en Cascada:** Cuando eliminas un cultivo:
\`\`\`
Eliminar Cultivo
↓
Eliminar todos sus Riegos
↓
Eliminar todas sus Fertilizaciones
↓
Eliminar todas sus Cosechas
\`\`\`

---

## ✅ Validaciones y Restricciones

El sistema tiene múltiples validaciones para asegurar que los datos sean correctos y consistentes.

### Validaciones por Entidad

#### 🌾 **Cultivo**

| Validación            | Regla                          | Razón                                 |
| --------------------- | ------------------------------ | ------------------------------------- |
| Tipo de planta        | No puede estar vacío           | Debes especificar qué siembras        |
| Fecha de siembra      | No puede ser futura            | No puedes sembrar en el futuro        |
| Área                  | Debe ser > 0                   | Un cultivo debe ocupar espacio        |
| Edición de fecha/área | NO permitida si tiene cosechas | Alteraría los cálculos de rendimiento |

#### 💧 **Riego**

| Validación         | Regla                           | Razón                                 |
| ------------------ | ------------------------------- | ------------------------------------- |
| Cultivo            | Debe existir                    | No puedes regar algo inexistente      |
| Fecha (ejecutado)  | No puede ser futura             | No puedes registrar algo futuro       |
| Fecha (ejecutado)  | No puede ser anterior a siembra | No puedes regar antes de sembrar      |
| Fecha (programado) | DEBE ser futura                 | Un riego programado es para el futuro |
| Cantidad de agua   | Debe ser > 0                    | Debes usar agua                       |

#### 🌿 **Fertilizacion**

| Validación           | Regla                           | Razón                                        |
| -------------------- | ------------------------------- | -------------------------------------------- |
| Cultivo              | Debe existir                    | No puedes fertilizar algo inexistente        |
| Fecha                | No puede ser futura             | Solo se registran fertilizaciones realizadas |
| Fecha                | No puede ser anterior a siembra | No puedes fertilizar antes de sembrar        |
| Tipo de fertilizante | No puede estar vacío            | Debes especificar qué usaste                 |
| Cantidad             | Debe ser > 0                    | Debes aplicar algo                           |

#### 🌽 **Cosecha**

| Validación | Regla                           | Razón                               |
| ---------- | ------------------------------- | ----------------------------------- |
| Cultivo    | Debe existir                    | No puedes cosechar algo inexistente |
| Fecha      | No puede ser futura             | No puedes cosechar algo futuro      |
| Fecha      | No puede ser anterior a siembra | No puedes cosechar antes de sembrar |
| Cantidad   | Debe ser > 0                    | Debes cosechar algo                 |

#### 📊 **Reporte**

| Validación   | Regla                | Razón                            |
| ------------ | -------------------- | -------------------------------- |
| Fechas       | No pueden ser nulas  | Debes especificar el período     |
| Fecha inicio | Debe ser ≤ fecha fin | El inicio debe ser antes del fin |

### Restricciones Especiales

#### 🔒 **Restricción de Integridad Referencial**

- **Regla:** No puedes tener riegos, fertilizaciones o cosechas sin un cultivo asociado
- **Implementación:** Todos los gestores validan que el `cultivoId` exista antes de registrar

#### 🔒 **Restricción de Edición con Cosechas**

- **Regla:** Si un cultivo tiene cosechas, NO puedes editar su fecha de siembra ni su área
- **Razón:** Cambiar estos datos alteraría los cálculos de rendimiento ya realizados
- **Advertencia:** El sistema muestra un mensaje al usuario indicando esta restricción

#### 🔒 **Restricción de Fechas Lógicas**

- **Regla:** Ninguna actividad puede ser anterior a la fecha de siembra del cultivo
- **Razón:** No tiene sentido lógico regar, fertilizar o cosechar antes de sembrar

#### 🔒 **Restricción de Eliminación en Cascada**

- **Regla:** Al eliminar un cultivo, se eliminan TODOS sus registros relacionados
- **Razón:** Evita datos "huérfanos" en el sistema
- **Advertencia:** El sistema pide confirmación antes de eliminar

### Mensajes de Error

Cuando una validación falla, el sistema muestra mensajes claros:

\`\`\`
ERROR: El tipo de planta no puede estar vacío.
ERROR: La fecha de siembra no puede ser futura.
ERROR: El cultivo con ID 'CULT_123' no existe.
ERROR: Un riego programado debe tener fecha futura.
ERROR: La fecha no puede ser anterior a la siembra del cultivo.
\`\`\`

---

## 🔄 Flujo Lógico del Sistema

### Inicio del Sistema

\`\`\`

1. Usuario ejecuta el programa
   ↓
2. Se crea SistemaAgroCare
   ↓
3. SistemaAgroCare crea todos los gestores
   ↓
4. SistemaAgroCare establece referencias cruzadas entre gestores
   ↓
5. Se cargan datos desde archivos (Fase 2)
   ↓
6. Se muestra el menú principal
   \`\`\`

### Flujo de Registro de un Cultivo

\`\`\`

1. Usuario selecciona "Registrar nuevo cultivo"
   ↓
2. Sistema solicita datos:
   - Tipo de planta
   - Fecha de siembra
   - Área
   - Observaciones (opcional)
     ↓
3. Se crea objeto Cultivo con los datos
   ↓
4. GestorCultivo valida los datos
   ↓
5. Si es válido:
   - Se genera un ID único
   - Se agrega a la lista de cultivos
   - Se muestra mensaje de éxito
     ↓
6. Si NO es válido:
   - Se muestra mensaje de error
   - NO se registra el cultivo
     \`\`\`

### Flujo de Registro de un Riego

\`\`\`

1. Usuario selecciona "Registrar riego"
   ↓
2. Sistema muestra lista de cultivos disponibles
   ↓
3. Usuario selecciona un cultivo (por ID)
   ↓
4. Sistema solicita datos:
   - Fecha del riego
   - Cantidad de agua
   - Si es programado o ejecutado
     ↓
5. Se crea objeto Riego con los datos
   ↓
6. GestorRiego valida:
   - ¿Existe el cultivo?
   - ¿La fecha es válida según el tipo?
   - ¿La cantidad es > 0?
     ↓
7. Si es válido:
   - Se genera un ID único
   - Se agrega a la lista de riegos
   - Se muestra mensaje de éxito
     ↓
8. Si NO es válido:
   - Se muestra mensaje de error
   - NO se registra el riego
     \`\`\`

### Flujo de Registro de una Cosecha

\`\`\`

1. Usuario selecciona "Registrar cosecha"
   ↓
2. Sistema muestra lista de cultivos disponibles
   ↓
3. Usuario selecciona un cultivo (por ID)
   ↓
4. Sistema solicita datos:
   - Fecha de cosecha
   - Cantidad cosechada (kg)
     ↓
5. Se crea objeto Cosecha con los datos
   ↓
6. GestorCosecha valida:
   - ¿Existe el cultivo?
   - ¿La fecha es válida?
   - ¿La cantidad es > 0?
     ↓
7. Si es válido:
   - Se genera un ID único
   - Se busca el área del cultivo
   - Se calcula el rendimiento (cantidad ÷ área)
   - Se guarda el rendimiento en la cosecha
   - Se agrega a la lista de cosechas
   - Se muestra mensaje de éxito con el rendimiento
     ↓
8. Si NO es válido:
   - Se muestra mensaje de error
   - NO se registra la cosecha
     \`\`\`

### Flujo de Eliminación de un Cultivo

\`\`\`

1. Usuario selecciona "Eliminar cultivo"
   ↓
2. Sistema muestra lista de cultivos
   ↓
3. Usuario ingresa ID del cultivo a eliminar
   ↓
4. Sistema busca el cultivo
   ↓
5. Si existe:
   - Se muestra información del cultivo
   - Se solicita confirmación (s/N)
     ↓
6. Si usuario confirma:
   - GestorCultivo elimina el cultivo
   - GestorCultivo elimina todos los riegos del cultivo
   - GestorCultivo elimina todas las fertilizaciones del cultivo
   - GestorCultivo elimina todas las cosechas del cultivo
   - Se muestra mensaje de éxito
     ↓
7. Si usuario NO confirma o cultivo no existe:
   - Se cancela la operación
   - NO se elimina nada
     \`\`\`

### Flujo de Generación de Reporte

\`\`\`

1. Usuario selecciona "Generar reporte por temporada"
   ↓
2. Sistema solicita:
   - Nombre de la temporada
   - Fecha de inicio
   - Fecha de fin
     ↓
3. GestorReporte valida las fechas
   ↓
4. Si son válidas:
   - Se obtienen todos los cultivos
   - Se filtran cultivos sembrados antes de la fecha fin
     ↓
5. Para cada cultivo:
   - Se filtran riegos en el rango de fechas
   - Se cuentan riegos y se suman litros
   - Se filtran fertilizaciones en el rango
   - Se cuentan fertilizaciones
   - Se filtran cosechas en el rango
   - Se cuentan cosechas y se suman kg
   - Se calcula rendimiento promedio
     ↓
6. Si el cultivo tuvo al menos una actividad:
   - Se crea un Reporte con todas las estadísticas
   - Se agrega a la lista de reportes
     ↓
7. Se muestran todos los reportes generados
   ↓
8. Si NO hubo actividades en el período:
   - Se muestra mensaje indicando que no hay datos
     \`\`\`

### Flujo de Edición con Restricciones

\`\`\`

1. Usuario selecciona "Editar cultivo"
   ↓
2. Sistema muestra lista de cultivos
   ↓
3. Usuario ingresa ID del cultivo a editar
   ↓
4. Sistema busca el cultivo
   ↓
5. Sistema verifica si tiene cosechas
   ↓
6. Si tiene cosechas:
   - Se muestra ADVERTENCIA
   - NO se permite editar fecha ni área
   - Solo se pueden editar tipo y observaciones
     ↓
7. Si NO tiene cosechas:
   - Se pueden editar todos los campos
     ↓
8. Usuario ingresa nuevos valores
   ↓
9. Se validan los nuevos datos
   ↓
10. Si son válidos:
    - Se actualizan los datos
    - Se muestra mensaje de éxito
      ↓
11. Si NO son válidos: - Se muestra mensaje de error - NO se actualiza el cultivo
    \`\`\`

### Cierre del Sistema

\`\`\`

1. Usuario selecciona "Salir" (opción 0)
   ↓
2. Sistema llama a finalizar()
   ↓
3. Cada gestor guarda sus datos en archivos
   ↓
4. Se muestra mensaje de despedida
   ↓
5. El programa termina
   \`\`\`

---

## 💾 Persistencia de Datos

### ¿Qué es la Persistencia?

**Persistencia** significa que los datos se guardan de forma permanente, no solo en la memoria temporal del programa. Cuando cierras el programa, los datos NO se pierden.

### Implementación Actual

El sistema está **preparado** para guardar y cargar datos desde archivos (Fase 2), pero actualmente solo muestra mensajes indicando que se está cargando/guardando.

### Métodos de Persistencia

Cada gestor tiene dos métodos:

#### 1. **cargarDesdeArchivo()**

- Se ejecuta al iniciar el sistema
- Lee datos desde un archivo
- Reconstruye los objetos en memoria

#### 2. **guardarEnArchivo()**

- Se ejecuta al cerrar el sistema
- Escribe todos los datos en un archivo
- Preserva la información para la próxima ejecución

### Flujo de Persistencia

\`\`\`
INICIO DEL PROGRAMA
↓
SistemaAgroCare.inicializar()
↓
GestorCultivo.cargarDesdeArchivo()
GestorRiego.cargarDesdeArchivo()
GestorFertilizacion.cargarDesdeArchivo()
GestorCosecha.cargarDesdeArchivo()
GestorReporte.cargarDesdeArchivo()
↓
[Usuario trabaja con el sistema]
↓
CIERRE DEL PROGRAMA
↓
SistemaAgroCare.finalizar()
↓
GestorCultivo.guardarEnArchivo()
GestorRiego.guardarEnArchivo()
GestorFertilizacion.guardarEnArchivo()
GestorCosecha.guardarEnArchivo()
GestorReporte.guardarEnArchivo()
↓
FIN
\`\`\`

### Ventajas de la Persistencia

1. **Continuidad:** Los datos se mantienen entre sesiones
2. **Seguridad:** No se pierden datos al cerrar el programa
3. **Historial:** Se puede consultar información antigua
4. **Respaldo:** Los archivos pueden copiarse como backup

---

## 🖥️ Interfaz de Usuario

### Estructura de Menús

El sistema usa una interfaz de **consola** (texto) organizada en menús jerárquicos.

\`\`\`
MENÚ PRINCIPAL
├── 1. Gestión de Cultivos
│ ├── 1. Registrar nuevo cultivo
│ ├── 2. Listar cultivos
│ ├── 3. Editar cultivo
│ ├── 4. Eliminar cultivo
│ └── 0. Volver
├── 2. Gestión de Fertilizaciones
│ ├── 1. Registrar fertilización
│ ├── 2. Listar fertilizaciones
│ ├── 3. Editar fertilización
│ ├── 4. Eliminar fertilización
│ └── 0. Volver
├── 3. Gestión de Riegos
│ ├── 1. Registrar riego (ejecutado)
│ ├── 2. Programar riego (futuro)
│ ├── 3. Listar riegos
│ ├── 4. Editar riego
│ ├── 5. Eliminar riego
│ └── 0. Volver
├── 4. Gestión de Cosechas
│ ├── 1. Registrar cosecha
│ ├── 2. Listar cosechas
│ ├── 3. Editar cosecha
│ ├── 4. Eliminar cosecha
│ └── 0. Volver
├── 5. Reportes de Producción
│ ├── 1. Generar reporte por temporada
│ ├── 2. Listar reportes
│ └── 0. Volver
└── 0. Salir
\`\`\`

### Características de la Interfaz

#### 1. **Navegación Intuitiva**

- Números para seleccionar opciones
- 0 siempre vuelve al menú anterior o sale
- Menús claros y organizados

#### 2. **Validación de Entrada**

- Si ingresas un dato inválido, el sistema te lo indica
- Puedes presionar Enter para mantener valores actuales al editar
- Confirmaciones para operaciones críticas (eliminar)

#### 3. **Mensajes Informativos**

- Mensajes de éxito cuando algo funciona
- Mensajes de error cuando algo falla
- Advertencias para operaciones importantes

#### 4. **Formato de Fechas**

- Todas las fechas usan el formato: **dd/MM/yyyy**
- Ejemplo: 15/01/2024 (15 de enero de 2024)

#### 5. **Listados Formateados**

- La información se muestra de forma organizada
- Uso de FormateadorDatos para presentación clara
- Reportes con formato visual atractivo

### Ejemplos de Interacción

#### Registrar un Cultivo

\`\`\`
=== GESTION DE CULTIVOS ===

1. Registrar nuevo cultivo
2. Listar cultivos
3. Editar cultivo
4. Eliminar cultivo
5. Volver al menu principal
   Seleccione una opcion: 1

--- Registrar Nuevo Cultivo ---
Tipo de planta: Tomate
Fecha de siembra (dd/MM/yyyy): 15/01/2024
Area sembrada (m2): 100
Observaciones (opcional): Terreno con buen drenaje

Cultivo registrado exitosamente!
ID asignado: CULT_1234567890
\`\`\`

#### Editar Cultivo con Cosechas

\`\`\`
--- Editar Cultivo ---
Ingrese el ID del cultivo a editar: CULT_1234567890

⚠ ADVERTENCIA: Este cultivo tiene cosechas registradas.
NO se puede editar la fecha de siembra ni el área.

Datos actuales: ID: CULT_1234567890 | Planta: Tomate | ...
Ingrese los nuevos datos (Enter para mantener el actual):

Tipo de planta [Tomate]: Tomate Cherry
Observaciones [Terreno con buen drenaje]: Excelente producción

Cultivo actualizado exitosamente!
\`\`\`

#### Generar Reporte

\`\`\`
--- Generar Reporte por Temporada ---
Nombre de la temporada: Verano 2024
Fecha de inicio (dd/MM/yyyy): 01/01/2024
Fecha de fin (dd/MM/yyyy): 31/03/2024

Generando reporte...

╔═════════════════════════════════════════════════════════════════╗
║ REPORTE DE PRODUCCION POR TEMPORADA ║
╠═════════════════════════════════════════════════════════════════╣
║ Temporada: Verano 2024 ║
║ Periodo: 01/01/2024 - 31/03/2024 ║
║ Total de Cultivos con Actividad: 3 ║
╚═════════════════════════════════════════════════════════════════╝

[Detalles de cada cultivo...]
\`\`\`

### Utilidades de Interfaz

#### **FormateadorDatos**

Clase que da formato a los datos para mostrarlos de forma legible:

- `formatearCultivo()`: Muestra información de un cultivo
- `formatearRiego()`: Muestra información de un riego
- `formatearFertilizacion()`: Muestra información de una fertilización
- `formatearCosecha()`: Muestra información de una cosecha
- `formatearReporte()`: Muestra un reporte completo con formato visual

#### **Advertencias Especiales**

El sistema muestra advertencias en situaciones importantes:

\`\`\`
⚠ ADVERTENCIA: Los reportes generados anteriormente NO se recalcularán automáticamente.
Si necesita datos actualizados, genere un nuevo reporte.
\`\`\`

\`\`\`
⚠ ADVERTENCIA: Este cultivo tiene cosechas registradas.
NO se puede editar la fecha de siembra ni el área.
\`\`\`

---

## 📝 Resumen de Conceptos Clave

### 1. **Gestores = Administradores**

Los gestores son como departamentos que administran cada tipo de información.

### 2. **Validaciones = Reglas de Negocio**

Las validaciones aseguran que los datos tengan sentido lógico.

### 3. **Referencias Cruzadas = Comunicación entre Gestores**

Los gestores se comunican entre sí para validar y mantener la integridad de los datos.

### 4. **Eliminación en Cascada = Limpieza Automática**

Al eliminar un cultivo, se eliminan automáticamente todos sus registros relacionados.

### 5. **Cálculos Automáticos = Inteligencia del Sistema**

El sistema calcula automáticamente el rendimiento de las cosechas.

### 6. **Reportes = Fotografías en el Tiempo**

Los reportes capturan el estado de los datos en un momento específico.

### 7. **Persistencia = Memoria Permanente**

Los datos se guardan en archivos para no perderse al cerrar el programa.

---

## 🎓 Glosario de Términos

| Término          | Significado                                                       |
| ---------------- | ----------------------------------------------------------------- |
| **Clase**        | Plantilla que define cómo se estructura un tipo de información    |
| **Objeto**       | Una instancia específica de una clase (ej: un cultivo específico) |
| **Gestor**       | Componente que administra un tipo de información                  |
| **ID**           | Identificador único que distingue un registro de otro             |
| **Validación**   | Verificación de que los datos cumplan ciertas reglas              |
| **Referencia**   | Conexión entre un objeto y otro (ej: riego → cultivo)             |
| **Cascada**      | Efecto en cadena (eliminar cultivo → eliminar sus riegos)         |
| **Persistencia** | Guardar datos de forma permanente en archivos                     |
| **Interfaz**     | Forma en que el usuario interactúa con el sistema                 |
| **Rendimiento**  | Productividad del cultivo (kg/m²)                                 |

---

## 🔍 Casos de Uso Comunes

### Caso 1: Registrar un Nuevo Cultivo y sus Actividades

\`\`\`

1. Registrar cultivo de tomate (100 m²)
2. Registrar riego (50 litros)
3. Registrar fertilización (5 kg de urea)
4. Registrar cosecha (80 kg)
   → Sistema calcula rendimiento: 0.80 kg/m²
5. Generar reporte de la temporada
   \`\`\`

### Caso 2: Intentar Editar un Cultivo con Cosechas

\`\`\`

1. Usuario intenta editar área de un cultivo
2. Sistema detecta que tiene cosechas
3. Sistema muestra advertencia
4. Sistema NO permite editar área ni fecha
5. Usuario solo puede editar tipo y observaciones
   \`\`\`

### Caso 3: Eliminar un Cultivo

\`\`\`

1. Usuario selecciona eliminar cultivo
2. Sistema muestra información del cultivo
3. Sistema pide confirmación
4. Usuario confirma
5. Sistema elimina:
   - El cultivo
   - Todos sus riegos
   - Todas sus fertilizaciones
   - Todas sus cosechas
6. Sistema muestra mensaje de éxito
   \`\`\`

### Caso 4: Generar Reporte de Temporada

\`\`\`

1. Usuario define temporada "Verano 2024"
2. Usuario define rango: 01/01/2024 - 31/03/2024
3. Sistema busca todos los cultivos
4. Sistema filtra actividades en el rango
5. Sistema calcula estadísticas
6. Sistema genera y muestra reportes
7. Reportes quedan guardados para consulta futura
   \`\`\`

---

## ✨ Conclusión

El **Sistema AgroCare Colombia** es una herramienta completa para la gestión de cultivos que:

- **Organiza** toda la información de forma estructurada
- **Valida** que los datos sean correctos y consistentes
- **Calcula** automáticamente métricas importantes
- **Protege** la integridad de los datos con validaciones cruzadas
- **Genera** reportes para análisis de producción
- **Persiste** los datos para uso continuo

El sistema está diseñado con una arquitectura modular donde cada componente tiene responsabilidades claras, facilitando su mantenimiento y futura expansión.

---

**Documento creado para:** Explicar el Sistema AgroCare a personas sin conocimientos profundos de programación  
**Versión:** 1.0  
**Fecha:** Enero 2024
