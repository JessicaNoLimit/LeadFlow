# architecture.md

# Arquitectura - LeadFlow

## Vision general

LeadFlow es una aplicacion web fullstack compuesta por:

1. Una web publica para Lorenzo Bellucci Studio
2. Un panel privado CRM para gestionar leads y solicitudes
3. Una API interna mediante Route Handlers de Next.js
4. Una base de datos en Supabase
5. Integraciones externas para automatizacion y comunicacion

---

# Arquitectura general

```txt
Cliente
   ->
Web publica (Next.js)
   ->
Formulario de contacto/presupuesto
   ->
Route Handler API (/api/leads)
   ->
Supabase
   ->
Dashboard CRM
   ->
Gestion interna de leads
```

---

# Tecnologias principales

## Frontend

- Next.js App Router
- TailwindCSS
- React Server Components
- Client Components solo cuando sea necesario

---

## Backend

El backend estara integrado dentro de Next.js mediante Route Handlers.

Ejemplos:

```txt
/api/leads
/api/auth
/api/leads/[id]
```

Funciones principales:

- Crear leads
- Obtener leads
- Actualizar estados
- Gestionar autenticacion
- Enviar emails automaticos

---

# Base de datos

## Supabase

Se utilizara Supabase como solucion cloud para:

- Persistencia de datos
- Escalabilidad sencilla
- Integracion rapida con Next.js
- Despliegue profesional

---

# Tablas principales

## leads

Almacenara solicitudes enviadas desde la web publica.

Campos previstos:

- id
- nombre
- email
- telefono
- tipo_sesion
- fecha_evento
- ubicacion
- presupuesto
- mensaje
- estado
- prioridad
- created_at

---

## admin_users

Usuarios autorizados para acceder al CRM.

Campos previstos:

- id
- email
- password_hash
- nombre
- created_at

---

# Estructura de la aplicacion

## Parte publica

```txt
/
|-- Inicio
|-- Portfolio
|-- Servicios
|-- Sobre mi
\-- Contacto
```

Objetivo:
- Branding
- Captacion
- Conversion de leads

---

## Parte privada

```txt
/dashboard
|-- Dashboard principal
|-- Leads
|-- Lead detalle
\-- Configuracion futura
```

Objetivo:
- Gestion de clientes
- Seguimiento comercial
- Organizacion interna

---

# Flujo de lead

## Proceso principal

```txt
Usuario visita la web
↓
Completa formulario
↓
Lead se guarda en Supabase
↓
Se envia email automatico
↓
Lead aparece en dashboard
↓
Administrador actualiza estado
```

---

# Estados del lead

Estados previstos:

- nuevo
- contactado
- presupuesto_enviado
- aceptado
- rechazado
- archivado

---

# Autenticacion

El CRM sera una zona protegida mediante:

- Better Auth
- Sistema custom sencillo

Solo administradores podran acceder al dashboard.

---

# Integracion externa

## Resend API

Se utilizara para:

- Confirmaciones automaticas
- Notificaciones internas
- Emails transaccionales

---

# Despliegue

## Produccion

Frontend + Backend:
- Vercel

Base de datos:
- Supabase Cloud

---

# Objetivos tecnicos

El proyecto debe demostrar:

- Arquitectura fullstack moderna
- Separacion clara de responsabilidades
- Buenas practicas
- Integracion de APIs
- Gestion de estado y datos
- Diseno responsive
- Organizacion escalable
