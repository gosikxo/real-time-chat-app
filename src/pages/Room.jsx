import React, { useEffect, useState } from "react"
import { COLLECTION_ID, DATABASE_ID, databases } from "../appwriteConfig"
import { ID, Query } from "appwrite"
import { Trash2 } from "react-feather"

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
      Query.limit(20),
    ])
    console.log(messages)
    setMessages(messages.documents)
  }

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID, message_id)
    setMessages((prevState) =>
      prevState.filter((message) => message.$id !== message_id)
    )
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
            {messages.map((message) => (
              <div key={message.$id} className="message--wrapper">
                <div className="message--header">
                  <small className="message-timestamp">
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                  <Trash2
                    className="delete--btn"
                    onClick={() => {
                      deleteMessage(message.$id)
                    }}
                  />
                </div>
                <div className="message--body">
                  <span>{message.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
