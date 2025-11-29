import { httpClient } from '@/lib/http-client'

export function useTestApi() {
  const testConnection = async () => {
    return httpClient.get<{ status: boolean }>('/api')
  }

  return {
    testConnection,
  }
}
