import { toast } from 'vue-sonner';

export default function useToast() {
  const success = (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 3000,
    })
  }

  const error = (message: string, description?: string) => {
    toast.error(message, {
      description,
      duration: 4000,
    })
  }

  const warning = (message: string, description?: string) => {
    toast.warning(message, {
      description,
      duration: 3500,
    })
  }

  const info = (message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 3000,
    })
  }

  const loading = (message: string) => {
    return toast.loading(message)
  }

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId)
  }

  const promise = <T>(
    promise: Promise<T>,
    options: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: unknown) => string)
    }
  ) => {
    return toast.promise(promise, options)
  }

  return {
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  }
}
