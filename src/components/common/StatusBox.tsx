import React from "react"
import { useAppContext } from "../../Context/AppContext"
import { StatusSkeleton } from "./Skeleton"

const StatusBox: React.FC = () => {
  const { state } = useAppContext()

  const occurrencesOfEach = (array: Object[], status: string) => {
    const occurrences = array.reduce((accumulator: number, rowData: any) => {
      if (rowData.status === status) {
        accumulator += 1
      }
      return accumulator
    }, 0)
    return occurrences
  }

  const approvedNum = occurrencesOfEach(state.originalData, "approved")
  const pendingNum = occurrencesOfEach(state.originalData, "pending")

  return (
    <div className="flex gap-2">
      <div className=" statusBox">
        {state.isLoading ? (
          <StatusSkeleton />
        ) : (
          <span className="text-4xl">{state.errorOnQuery ? "" : approvedNum}</span>
        )}
        {state.errorOnQuery && !state.isLoading && <span className="text-4xl">--</span>}

        <span>Active</span>
      </div>
      <div className=" statusBox">
        {state.isLoading ? (
          <StatusSkeleton />
        ) : (
          <span className="text-4xl">{state.errorOnQuery ? "" : pendingNum}</span>
        )}
        {state.errorOnQuery && !state.isLoading && <span className="text-4xl">--</span>}
        <span>Pending</span>
      </div>
    </div>
  )
}

export default StatusBox
