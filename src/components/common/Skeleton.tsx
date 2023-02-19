import React from "react"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import Skeleton from "@mui/material/Skeleton"

const getRandomInt = (min: number = 30, max: number = 80) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const TableRowSkeleton: React.FC = () => {
  let times = [1, 2, 3]

  return (
    <>
      {times.map((count = 0) => {
        return (
          <TableRow key={++count}>
            <TableCell>
              <div className="flex items-center">
                <Skeleton variant="circular" width={25} height={25} className="mr-3" />
                <Skeleton variant="rectangular" sx={{ width: `${getRandomInt()}%` }} />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" sx={{ width: `${getRandomInt()}%` }} />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" sx={{ width: `${getRandomInt()}%` }} />
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export const StatusSkeleton = () => {
  return (
    <>
      <Skeleton className="text-4xl" variant="rectangular" sx={{ width: "50%" }} />
    </>
  )
}
