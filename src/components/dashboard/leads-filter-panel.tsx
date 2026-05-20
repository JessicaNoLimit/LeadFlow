"use client";

type LeadsFilterPanelProps = {
  searchQuery: string;
  statusFilter: string;
  priorityFilter: string;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onReset: () => void;
};

const statusOptions = [
  { value: "todos", label: "Todos los estados" },
  { value: "nuevo", label: "Nuevo" },
  { value: "contactado", label: "Contactado" },
  { value: "presupuesto_enviado", label: "Presupuesto enviado" },
  { value: "aceptado", label: "Aceptado" },
  { value: "rechazado", label: "Rechazado" },
  { value: "archivado", label: "Archivado" },
] as const;

const priorityOptions = [
  { value: "todas", label: "Todas las prioridades" },
  { value: "baja", label: "Baja" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
] as const;

const fieldClassName =
  "h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-ivory outline-none transition placeholder:text-mist/42 focus:border-sand/40 focus:bg-black/28 focus-visible:ring-2 focus-visible:ring-sand/40";

export function LeadsFilterPanel({
  searchQuery,
  statusFilter,
  priorityFilter,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onReset,
}: LeadsFilterPanelProps) {
  return (
    <div className="mt-8 rounded-[1.6rem] border border-white/8 bg-black/16 p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="lead-search"
            className="mb-2 block text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Buscar por nombre o email
          </label>
          <input
            id="lead-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Ej. Sofia o sofia@email.com"
            className={`${fieldClassName} w-full`}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:w-auto">
          <div className="sm:min-w-[13rem]">
            <label
              htmlFor="lead-status"
              className="mb-2 block text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
            >
              Estado
            </label>
            <select
              id="lead-status"
              value={statusFilter}
              onChange={(event) => onStatusChange(event.target.value)}
              className={`${fieldClassName} w-full appearance-none`}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#141414]">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:min-w-[13rem]">
            <label
              htmlFor="lead-priority"
              className="mb-2 block text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
            >
              Prioridad
            </label>
            <select
              id="lead-priority"
              value={priorityFilter}
              onChange={(event) => onPriorityChange(event.target.value)}
              className={`${fieldClassName} w-full appearance-none`}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#141414]">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="h-12 rounded-2xl border border-white/12 px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50"
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>
    </div>
  );
}
