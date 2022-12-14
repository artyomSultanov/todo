import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react'

const useTodoForm = (handleAdd: (title: string) => void) => {
  const [title, setTitle] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (title.trim() !== '') handleAdd(title)
    setTitle('')
  }
  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter' && title.trim() !== '') {
      handleAdd(title)
      setTitle('')
    }
  }

  return { title, handleChange, handleSubmit, handleKey }
}

export default useTodoForm
