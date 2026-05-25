export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          nombre: string;
          email: string;
          telefono: string | null;
          tipo_sesion: string;
          fecha_evento: string | null;
          ubicacion: string | null;
          presupuesto: string | null;
          mensaje: string | null;
          estado: string;
          prioridad: string;
          notas_internas: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nombre: string;
          email: string;
          telefono?: string | null;
          tipo_sesion: string;
          fecha_evento?: string | null;
          ubicacion?: string | null;
          presupuesto?: string | null;
          mensaje?: string | null;
          estado?: string;
          prioridad?: string;
          notas_internas?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nombre?: string;
          email?: string;
          telefono?: string | null;
          tipo_sesion?: string;
          fecha_evento?: string | null;
          ubicacion?: string | null;
          presupuesto?: string | null;
          mensaje?: string | null;
          estado?: string;
          prioridad?: string;
          notas_internas?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      presupuestos: {
        Row: {
          id: string;
          lead_id: string | null;
          cliente_nombre: string | null;
          cliente_email: string | null;
          cliente_telefono: string | null;
          fecha_evento: string | null;
          titulo: string;
          descripcion: string | null;
          importe: number;
          estado: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          cliente_nombre?: string | null;
          cliente_email?: string | null;
          cliente_telefono?: string | null;
          fecha_evento?: string | null;
          titulo: string;
          descripcion?: string | null;
          importe: number;
          estado?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string | null;
          cliente_nombre?: string | null;
          cliente_email?: string | null;
          cliente_telefono?: string | null;
          fecha_evento?: string | null;
          titulo?: string;
          descripcion?: string | null;
          importe?: number;
          estado?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "presupuestos_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
