"use client"

import React, { useEffect, useState } from "react"
import { ForbiddenModal } from "../errors/forbidden-modal"

interface ForbiddenProviderProps {
  children: React.ReactNode
}

export function ForbiddenProvider({ children }: ForbiddenProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleForbiddenError = () => {
      setIsModalOpen(true)
    }

    window.addEventListener("APP_FORBIDDEN_ERROR", handleForbiddenError)

    return () => {
      window.removeEventListener("APP_FORBIDDEN_ERROR", handleForbiddenError)
    }
  }, [])

  return (
    <>
      {children}
      <ForbiddenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
