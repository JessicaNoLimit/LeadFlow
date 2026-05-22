create extension if not exists pgcrypto;

create table if not exists public.presupuestos (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  titulo text not null,
  descripcion text,
  importe numeric(10,2) not null,
  estado text not null default 'borrador',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint presupuestos_estado_check check (
    estado in ('borrador', 'enviado', 'aceptado', 'rechazado')
  ),
  constraint presupuestos_importe_check check (importe > 0)
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

drop trigger if exists presupuestos_set_updated_at on public.presupuestos;

create trigger presupuestos_set_updated_at
before update on public.presupuestos
for each row
execute function public.set_updated_at();

create index if not exists presupuestos_lead_id_idx on public.presupuestos (lead_id);
create index if not exists presupuestos_estado_idx on public.presupuestos (estado);
create index if not exists presupuestos_created_at_idx on public.presupuestos (created_at desc);

comment on table public.presupuestos is 'Presupuestos internos generados desde el CRM para leads del estudio.';
comment on column public.presupuestos.lead_id is 'Lead vinculado al presupuesto cuando exista una oportunidad relacionada.';
comment on column public.presupuestos.estado is 'Estado comercial actual del presupuesto dentro del CRM.';
comment on column public.presupuestos.importe is 'Importe total propuesto para la oferta comercial.';
