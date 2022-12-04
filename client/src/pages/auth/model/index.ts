import { FormEvent, useState } from 'react'

const useAuth = (
  method: (email: string, password: string) => Promise<void>
) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (email && password) {
      method(email, password)
      setEmail('')
      setPassword('')
    }
  }
  const handleReset = () => {
    setEmail('')
    setPassword('')
  }

  return { email, setEmail, password, setPassword, handleSubmit, handleReset }
}

export default useAuth
