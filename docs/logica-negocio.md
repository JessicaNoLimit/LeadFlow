# logica-negocio.md

# Logica de negocio - LeadFlow

## Vision general

LeadFlow es un CRM orientado a la captacion y gestion de clientes potenciales para Lorenzo Bellucci Studio, un estudio fotografico premium.

La aplicacion permite:

- Captar solicitudes desde la web publica
- Centralizar leads en un dashboard privado
- Gestionar el estado comercial de cada solicitud
- Hacer seguimiento interno de posibles clientes

---

# Objetivo principal del negocio

El objetivo principal del sistema es evitar la perdida de oportunidades comerciales y mejorar la organizacion interna del estudio fotografico.

El CRM debe permitir:

- Centralizar contactos
- Priorizar solicitudes
- Organizar presupuestos
- Mantener seguimiento de clientes
- Facilitar respuestas rapidas

---

# Que es un lead

Un lead representa una posible oportunidad de negocio.

Cada lead corresponde a una persona interesada en contratar alguno de los servicios fotograficos del estudio.

---

# Origen de los leads

Los leads seran creados unicamente desde el formulario publico de la web.

Cada vez que un usuario complete el formulario:

1. La solicitud se almacena en la base de datos
2. Se asigna el estado "nuevo"
3. Se registra la fecha de creacion
4. Se envia un email automatico de confirmacion

---

# Datos principales de un lead

Cada lead debe contener:

- Nombre
- Email
- Telefono
- Tipo de sesion
- Fecha estimada
- Ubicacion
- Presupuesto aproximado
- Mensaje del cliente
- Estado
- Prioridad
- Fecha de creacion

---

# Estados del lead

## nuevo

Estado inicial.

El lead acaba de llegar y todavia no ha sido revisado.

---

## contactado

El estudio ya ha respondido o iniciado contacto con el cliente.

---

## presupuesto_enviado

Se ha enviado una propuesta economica.

---

## aceptado

El cliente ha aceptado el presupuesto o confirmado interes real.

---

## rechazado

El cliente rechaza el presupuesto o no continua el proceso.

---

## archivado

Lead cerrado o almacenado para seguimiento futuro.

---

# Prioridad de leads

Los leads podran marcarse con diferentes niveles de prioridad.

Objetivo:
- Organizar mejor clientes importantes
- Identificar eventos urgentes
- Priorizar presupuestos de mayor valor

Prioridades previstas:

- baja
- media
- alta

---

# Notas internas

Los administradores podran anadir notas privadas a cada lead.

Las notas serviran para:

- Registrar conversaciones
- Guardar detalles importantes
- Hacer seguimiento comercial
- Registrar preferencias del cliente

Las notas nunca seran visibles publicamente.

---

# Reglas del dashboard

## Acceso protegido

Solo usuarios autenticados podran acceder al CRM.

---

## Gestion interna

Los administradores podran:

- Ver leads
- Filtrar leads
- Cambiar estados
- Anadir notas
- Revisar informacion enviada

---

# Emails automaticos

Cuando un lead sea creado:

- El cliente recibira un email automatico de confirmacion
- El estudio podra recibir una notificacion interna futura

Objetivos:
- Mejorar experiencia del usuario
- Confirmar recepcion del formulario
- Automatizar primeras respuestas

---

# Reglas del formulario publico

El formulario debe:

- Ser simple y elegante
- Priorizar experiencia premium
- Evitar demasiados campos obligatorios
- Facilitar el envio desde movil

---

# Filosofia del proyecto

LeadFlow no busca ser un CRM complejo empresarial.

El objetivo es construir:

- Una herramienta realista
- Moderna
- Visualmente elegante
- Facil de usar
- Escalable
- Orientada a pequenos negocios creativos

---

# Objetivo tecnico y profesional

El proyecto debe demostrar:

- Desarrollo fullstack moderno
- Gestion de datos
- Arquitectura organizada
- Integracion de APIs
- Autenticacion
- Diseno responsive
- Pensamiento orientado a negocio real
