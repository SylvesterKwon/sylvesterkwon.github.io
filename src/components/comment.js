import React, { createRef, useEffect } from "react"

export default function Comment() {
  const containerRef = createRef()
  useEffect(() => {
    const utterances = document.createElement("script")
    const attributes = {
      src: "https://utteranc.es/client.js",
      repo: "SylvesterKwon/sylvesterkwon.github.io",
      "issue-term": "pathname",
      theme: "github-light",
      crossorigin: "anonymous",
      async: "true",
    }
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    containerRef.current.appendChild(utterances)
  })
  return <div id="comment" ref={containerRef} />
}
