alter table public.presupuestos
add column if not exists cliente_nombre text,
add column if not exists cliente_email text,
add column if not exists cliente_telefono text;