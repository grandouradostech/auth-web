import Button from "@/app/_components/button"
import { ColumnProps, DynamicTable } from "@/app/_components/table"
import { IUsersApp } from "@/types/app"
import { IRole } from "@/types/auth"
import { IFullUsers } from "@/types/users"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowRightCircle, FileUser, Info } from "lucide-react"

const usuarioColumns: ColumnProps<IFullUsers>[] = [
  {
    header: "Nome",
    key: "nome",
    sortable: true,
  },
  {
    header: "E-mail",
    key: "email",
    sortable: true,
  },
  {
    header: "Status",
    key: "status",
    sortable: true,
    render: (value: string) => (
      <span
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: value === "ATIVO" ? "#10b98120" : "#ef444420",
          color: value === "ATIVO" ? "#10b981" : "#ef4444",
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}
      >
        {value}
      </span>
    ),
  },
  {
    header: "Inclusão",
    key: "criadoEm",

    sortable: true,
    render: (criadoEm: Date) => (
      <p style={{ textTransform: "capitalize" }}>
        {format(new Date(criadoEm), "dd MMM yyyy", {
          locale: ptBR,
        })}
      </p>
    ),
  },
  {
    header: "Gerenciar",
    key: "id",
    sortable: false,
    render: (
      id: string,
      { empresaId = "312e0216-b893-4ef2-9c8e-f49809f49b6f" }: any,
    ) => (
      <Button
        navigate={`/${empresaId}/dashboard/pessoas/${id}`}
        fit="icon"
        variant="ghost"
        style={{}}
      >
        <Info size={20} />
      </Button>
    ),
  },
]

export function UserListTable({
  usuarios,
  isLoading,
}: {
  usuarios: IFullUsers[]
  isLoading: boolean
}) {
  return (
    <DynamicTable
      isLoading={isLoading}
      data={usuarios}
      rowKey={"id"}
      columns={usuarioColumns}
    />
  )
}
