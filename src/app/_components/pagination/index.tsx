"use client"

import React, { useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import * as S from "./styles"

interface PaginationProps {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export function Pagination({
  page,
  perPage,
  total,
  totalPages,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (paramsToUpdate: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        params.set(key, value)
      })
      return params.toString()
    },
    [searchParams],
  )

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(
        pathname +
          "?" +
          createQueryString({
            page: String(newPage),
            perPage: String(perPage),
          }),
      )
    }
  }

  const generatePages = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ type: "page", value: i })
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push({ type: "page", value: i })
        }
        pages.push({ type: "ellipsis", value: "ellipsis-end" })
        pages.push({ type: "page", value: totalPages })
      } else if (page >= totalPages - 3) {
        pages.push({ type: "page", value: 1 })
        pages.push({ type: "ellipsis", value: "ellipsis-start" })
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push({ type: "page", value: i })
        }
      } else {
        pages.push({ type: "page", value: 1 })
        pages.push({ type: "ellipsis", value: "ellipsis-start" })
        pages.push({ type: "page", value: page - 1 })
        pages.push({ type: "page", value: page })
        pages.push({ type: "page", value: page + 1 })
        pages.push({ type: "ellipsis", value: "ellipsis-end" })
        pages.push({ type: "page", value: totalPages })
      }
    }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <S.PaginationContainer>
      <S.PaginationInfo>
        Mostrando {(page - 1) * perPage + 1} a {Math.min(page * perPage, total)}{" "}
        de {total} registros
      </S.PaginationInfo>

      <S.PaginationControls>
        <S.PageButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft size={16} />
        </S.PageButton>

        {generatePages().map((item) => (
          <React.Fragment key={item.value}>
            {item.type === "page" ? (
              <S.PageButton
                $active={page === item.value}
                onClick={() => handlePageChange(item.value as number)}
              >
                {item.value}
              </S.PageButton>
            ) : (
              <S.Ellipsis>
                <MoreHorizontal size={16} />
              </S.Ellipsis>
            )}
          </React.Fragment>
        ))}

        <S.PageButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRight size={16} />
        </S.PageButton>
      </S.PaginationControls>
    </S.PaginationContainer>
  )
}
