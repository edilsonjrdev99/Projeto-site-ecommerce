import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { apiConfig } from '@/config/api'

export class HttpError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

interface RequestOptions {
  params?: Record<string, string | number | boolean>
  headers?: Record<string, string>
}

interface CallbackOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: HttpError) => void
  onFinally?: () => void
}

interface RequestWithCallbackOptions<T> extends RequestOptions, CallbackOptions<T> {}

class HttpClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      withCredentials: apiConfig.withCredentials,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Interceptor de resposta para tratamento de erros
    this.client.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response) {
          const data = error.response.data as { message?: string; code?: string }
          const message = data.message || 'Erro na requisição'
          const statusCode = error.response.status
          const code = data.code

          throw new HttpError(message, statusCode, code)
        }

        if (error.code === 'ECONNABORTED') {
          throw new HttpError('Tempo de requisição excedido', 408)
        }

        throw new HttpError(error.message || 'Erro desconhecido', 500)
      }
    )
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await this.client.get<T>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await this.client.put<T>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await this.client.patch<T>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await this.client.delete<T>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    })
    return response.data
  }

  // Métodos com callbacks
  getWithCallback<T>(endpoint: string, options?: RequestWithCallbackOptions<T>): void {
    this.executeWithCallback(() => this.get<T>(endpoint, options), options)
  }

  postWithCallback<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestWithCallbackOptions<T>
  ): void {
    this.executeWithCallback(() => this.post<T>(endpoint, data, options), options)
  }

  putWithCallback<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestWithCallbackOptions<T>
  ): void {
    this.executeWithCallback(() => this.put<T>(endpoint, data, options), options)
  }

  patchWithCallback<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestWithCallbackOptions<T>
  ): void {
    this.executeWithCallback(() => this.patch<T>(endpoint, data, options), options)
  }

  deleteWithCallback<T>(endpoint: string, options?: RequestWithCallbackOptions<T>): void {
    this.executeWithCallback(() => this.delete<T>(endpoint, options), options)
  }

  private async executeWithCallback<T>(
    requestFn: () => Promise<T>,
    options?: CallbackOptions<T>
  ): Promise<void> {
    try {
      const data = await requestFn()
      options?.onSuccess?.(data)
    } catch (error) {
      const httpError = error instanceof HttpError ? error : new HttpError('Erro desconhecido', 500)
      options?.onError?.(httpError)
    } finally {
      options?.onFinally?.()
    }
  }
}

export const httpClient = new HttpClient()
