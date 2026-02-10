const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiOptions {
  method?: HttpMethod
  body?: unknown
  token?: string | null
}

export async function apiClient<T>(
  endpoint: string,
  { method = 'GET', body, token }: ApiOptions = {}
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(error?.message || 'Something went wrong')
  }

  return res.json() as Promise<T>
}
