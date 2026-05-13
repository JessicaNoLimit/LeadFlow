create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  telefono text,
  tipo_sesion text not null,
  fecha_evento date,
  ubicacion text,
  presupuesto text,
  mensaje text,
  estado text not null default 'nuevo',
  prioridad text not null default 'media',
  notas_internas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;

create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

create index if not exists leads_estado_idx on public.leads (estado);
create index if not exists leads_prioridad_idx on public.leads (prioridad);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

comment on table public.leads is 'Solicitudes de contacto y presupuesto recibidas desde la web publica.';
comment on column public.leads.tipo_sesion is 'Categoria o tipo de sesion fotografica solicitada.';
comment on column public.leads.estado is 'Estado comercial actual del lead.';
comment on column public.leads.prioridad is 'Nivel de prioridad interna para seguimiento.';
comment on column public.leads.notas_internas is 'Observaciones privadas visibles solo en el CRM.';
