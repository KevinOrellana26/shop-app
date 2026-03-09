"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { PARAMS } from "@/src/config/params.config";
import { parseAsInteger, useQueryState } from "nuqs";

type ProductPaginationProps = {
  currentPage: number;
  totalItems: number;
  limit: number;
};

export default function ProductPagination({
  currentPage,
  totalItems,
  limit,
}: ProductPaginationProps) {
  const totalPages = Math.ceil(totalItems / limit);
  const [_, setPage] = useQueryState(
    PARAMS.page,
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  // Función helper para generar array de números de página a mostrar
  const getPageNumbers = () => {
    const delta = 2; // Cuántas páginas mostrar a cada lado de la actual
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "ellipsis-start");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("ellipsis-end", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null; // No mostrar si solo hay 1 página

  return (
    <Pagination>
      <PaginationContent>
        {/* Botón Anterior */}
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setPage(currentPage - 1);
            }}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Números de página */}
        {getPageNumbers().map((pageNum, idx) => {
          if (pageNum === "ellipsis-start" || pageNum === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  setPage(pageNum as number);
                }}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Botón Siguiente */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setPage(currentPage + 1);
            }}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
