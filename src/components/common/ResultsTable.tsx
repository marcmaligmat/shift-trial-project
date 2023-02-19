import React from "react"
import { useAppContext } from "../../Context/AppContext"
import { FinalDataInterface } from "../../App"

import { TableRowSkeleton } from "./Skeleton"

import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import DeleteIcon from "@mui/icons-material/Delete"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { Avatar } from "@mui/material"

import TransitionsModal from "../../components/common/DeleteModal"

interface Column {
  id: "completeName" | "email" | "status"
  label: string
  format?: (value: string) => string
}

const columns: readonly Column[] = [
  { id: "completeName", label: "Name" },
  { id: "email", label: "Email" },
  {
    id: "status",
    label: "Status",
    format: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
  },
]

const deleteById = (results: FinalDataInterface[], id: string) => {
  return results.filter((data) => data.id !== id)
}

const ResultsTable: React.FC = () => {
  const { state, setState } = useAppContext()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleOpenDeleteModal = (id: string) => {
    setOpen(true)
    setState({ idToDelete: id })
  }
  const handleOnDelete = () => {
    const data = deleteById(state.originalData, state.idToDelete as string)
    const filterData = deleteById(state.filteredData, state.idToDelete as string)
    setState({ originalData: data, filteredData: filterData })
    setOpen(false)
  }
  const props = {
    open,
    handleOpen,
    handleClose,
    handleOnDelete,
  }
  return (
    <>
      <TransitionsModal {...props} />
      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none", marginTop: "20px" }}>
        <TableContainer sx={{ maxHeight: 538, borderLeft: 0 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} className="font-bold">
                    {column.label}
                  </TableCell>
                ))}
                {!state.isLoading && <TableCell></TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {state.isLoading ? (
                <TableRowSkeleton />
              ) : (
                state.filteredData.map((row) => {
                  return (
                    <TableRow className="group" hover key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id}>
                            <div className="flex flex-row items-center">
                              {column.id === "completeName" && row.numRow === 1 && (
                                <Avatar
                                  src="/profile-img.jpg"
                                  className="mr-5 text-5xl"
                                  sx={{ width: 48, height: 48 }}
                                />
                              )}
                              {column.id === "completeName" && row.numRow !== 1 && (
                                <AccountCircleIcon className="mr-5 text-5xl text-gray-400" />
                              )}

                              {column.format ? column.format(value) : value}
                            </div>
                          </TableCell>
                        )
                      })}
                      <TableCell>
                        <div className="ml-16 opacity-0 group-hover:opacity-100">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleOpenDeleteModal(row.id)}
                          >
                            <DeleteIcon className="text-gray-400 " />
                            <span className="text-gray-400">Delete</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
          {state.filteredData.length === 0 && !state.isLoading && !state.errorOnQuery && (
            <div className="flex justify-center mt-5 text-gray-500">
              No users found. Try a different search or Invite a Team Member
            </div>
          )}

          {state.errorOnQuery && (
            <div className="flex justify-center mt-5 text-gray-500">
              <ErrorOutlineIcon />
              <span className="pl-3 text-gray-500">Something went wrong.</span>
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  window.location.reload()
                }}
              >
                Try again
              </span>
            </div>
          )}
        </TableContainer>
      </Paper>
    </>
  )
}

export default ResultsTable
