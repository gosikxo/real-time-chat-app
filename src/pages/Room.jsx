import React, { useEffect } from "react"
import { COLLECTION_ID, DATABASE_ID, databases } from "../appwriteConfig"

export default function Room() {
  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    const messages = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
    console.log(messages)
  }

  return <div>Room</div>
}
