// src/supabase-client.ts
type SupabaseResponse<T> = Promise<{ data: T[]; error: null }>;

export const supabase = {
  from: <T = any>(tableName: string) => ({
    select: (): SupabaseResponse<T> => Promise.resolve({ data: [], error: null }),
    insert: (data: T): SupabaseResponse<T> => Promise.resolve({ data: [data], error: null }),
    order: () => ({
      select: (): SupabaseResponse<T> => Promise.resolve({ data: [], error: null }),
    }),
    eq: (): SupabaseResponse<T> => Promise.resolve({ data: [], error: null }),
    delete: (): SupabaseResponse<T> => Promise.resolve({ data: [], error: null }),
  }),
  storage: {
    from: (bucketName: string) => ({
      upload: async (): Promise<{ error: null }> => ({ error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: "" } }),
    }),
  },
  auth: {
    signIn: async () => ({ data: {}, error: null }),
    signOut: async () => ({ error: null }),
  },
};
