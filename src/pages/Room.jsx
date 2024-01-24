import React, { useEffect, useState } from "react"
import { COLLECTION_ID, DATABASE_ID, databases } from "../appwriteConfig"

export default function Room() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    const messages = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
    console.log(messages)
    setMessages(messages.documents)
  }

  return (
    <div>
      <div>
        {messages.map((messages) => (
          <div key={messages.$id}>
            <span>{messages.body}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
