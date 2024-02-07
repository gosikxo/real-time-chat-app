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
    <main className="container">
      <div className="room--container">
        <div>
          <div>
            {messages.map((messages) => (
              <div key={messages.$id} className="message--wrapper">
                <div className="message-header">
                  <small className="message-timestamp">
                    {messages.$createdAt}
                  </small>
                </div>
                <div className="message--body">
                  <span>{messages.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
