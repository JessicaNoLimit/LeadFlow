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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
