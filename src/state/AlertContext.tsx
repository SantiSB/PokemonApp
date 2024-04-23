'use client'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from 'react'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertState {
  show: boolean
  message: string
  type: AlertType
}

interface AlertContextType {
  alert: AlertState
  showAlert: (message: string, type: AlertType) => void
  hideAlert: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de un AlertProvider')
  }
  return context
}

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    message: '',
    type: 'success',
  })

  const showAlert = (message: string, type: AlertType = 'success') => {
    setAlert({ show: true, message, type })
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  const hideAlert = () => {
    setAlert({ show: false, message: '', type: 'success' })
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  )
}
