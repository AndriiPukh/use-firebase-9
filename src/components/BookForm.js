import { useState } from 'react'
import {useAuthContext} from "../hooks/useAuthContext";
import {db} from '../firebase/config'
import {collection, addDoc} from "firebase/firestore";

export default function BookForm() {
  const [newBook, setNewBook] = useState('')
    const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ref = collection(db, 'books')
    await addDoc(ref, {
        title: newBook,
        uid: user.uid
    })
    // clean state
    setNewBook('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input 
          required
          type="text"
          onChange={(e) => setNewBook(e.target.value)}
          value={newBook}
        />
      </label>
      <button>Add</button>
    </form>
  )
}
