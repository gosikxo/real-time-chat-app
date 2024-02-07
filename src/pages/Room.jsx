import React, { useEffect, useState } from "react"
import { COLLECTION_ID, DATABASE_ID, databases } from "../appwriteConfig"
import { ID, Query } from "appwrite"

export default function Room() {
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState("")

  useEffect(() => {
    getMessages()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let payload = {
      body: messageBody,
    }

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      payload
    )

    setMessages((prevState) => [response, ...prevState])

    setMessageBody("")
  }

  const getMessages = async () => {
    const messages = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ])
    console.log(messages)
    setMessages(messages.documents)
  }

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="Type your message here"
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
            />
          </div>
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Send" />
          </div>
        </form>
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
