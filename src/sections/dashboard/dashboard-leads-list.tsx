"use client";

import { useMemo, useState } from "react";
import { LeadsFilterPanel } from "@/components/dashboard/leads-filter-panel";
import { LeadsTable } from "@/components/dashboard/leads-table";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type DashboardLeadsListProps = {
  leads: Lead[];
};

function normalizeValue(value: string) {
  return value.trim().toLocaleLowerCase("es-ES");
}

export function DashboardLeadsList({ leads }: DashboardLeadsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [priorityFilter, setPriorityFilter] = useState("todas");

  const normalizedQuery = normalizeValue(searchQuery);
  const hasActiveFilters =
    normalizedQuery.length > 0 ||
    statusFilter !== "todos" ||
    priorityFilter !== "todas";

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        normalizeValue(lead.nombre).includes(normalizedQuery) ||
        normalizeValue(lead.email).includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "todos" || lead.estado === statusFilter;

      const matchesPriority =
        priorityFilter === "todas" || lead.prioridad === priorityFilter;

      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [leads, normalizedQuery, priorityFilter, statusFilter]);

  if (leads.length === 0) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Leads
        </p>
        <h2 className="mt-4 font-heading text-3xl text-ivory">
          No hay solicitudes registradas todavia.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/76">
          Cuando lleguen nuevas consultas desde la web publica, apareceran aqui
          listas para iniciar el seguimiento comercial.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Leads
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">
            Solicitudes recibidas
          </h2>
        </div>
        <p className="text-sm leading-7 text-mist/72">
          Listado real consumido desde la API interna de LeadFlow.
        </p>
      </div>

      <LeadsFilterPanel
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onReset={() => {
          setSearchQuery("");
          setStatusFilter("todos");
          setPriorityFilter("todas");
        }}
      />

      <div className="mt-6 flex flex-col gap-2 border-b border-white/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-mist/74">
          Mostrando {filteredLeads.length} de {leads.length} solicitudes
        </p>
        {hasActiveFilters ? (
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/52">
            Filtros activos sobre nombre, email, estado y prioridad
          </p>
        ) : null}
      </div>

      {filteredLeads.length === 0 ? (
        <div className="mt-8 rounded-[1.6rem] border border-white/8 bg-black/18 p-8">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sand">
            Sin coincidencias
          </p>
          <h3 className="mt-4 font-heading text-3xl text-ivory">
            No se encontraron leads con los filtros actuales.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/76">
            Prueba a modificar la busqueda o limpiar los filtros para recuperar el
            pipeline completo.
          </p>
        </div>
      ) : (
        <LeadsTable leads={filteredLeads} />
      )}
    </section>
  );
}
