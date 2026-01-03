// supabase-client.ts (mock version)
export const supabase = {
  from: (tableName: string) => ({
    select: async () => ({
      data: [],
      error: null
    }),
    insert: async (data: any) => ({
      data,
      error: null
    }),
    order: () => ({
      select: async () => ({ data: [], error: null })
    })
  }),
  storage: {
    from: (bucketName: string) => ({
      upload: async () => ({ error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: '' } })
    })
  }
};
