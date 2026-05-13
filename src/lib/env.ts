function getEnvVariable(name: keyof NodeJS.ProcessEnv) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  nextPublicSupabaseUrl: getEnvVariable("NEXT_PUBLIC_SUPABASE_URL"),
  nextPublicSupabaseAnonKey: getEnvVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: getEnvVariable("SUPABASE_SERVICE_ROLE_KEY"),
  databaseUrl: getEnvVariable("DATABASE_URL"),
};
