// src/shared/components/dashboard/DynamicBreadcrumbs.tsx
"use client"

import React from "react"
import { usePathname } from "next/navigation"

import { Route } from "next"
import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"

// Diccionario para traducir rutas a nombres amigables
const routeMap: Record<string, string> = {
  students: "Estudiantes",
  groups: "Grupos",
  clases: "Clases",
  home: "Inicio",
  settings: "Configuración",
  "mis-clases": "Mis Clases",
}

export function DynamicBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter((segment) => segment && segment !== "dashboard")

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = `/dashboard/${segments.slice(0, index + 1).join("/")}`
          const isLast = index === segments.length - 1
          const label = routeMap[segment] || segment // Si no está en el mapa, muestra el ID o el slug tal cual

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href as Route} className="capitalize">
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}