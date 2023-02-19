import React from "react"
import SearchBar from "./common/SearchBar"
import StatusBox from "./common/StatusBox"
import ResultsTable from "./common/ResultsTable"

const People: React.FC = () => {
  return (
    <div className="flex flex-col ">
      <StatusBox />
      <SearchBar />
      <ResultsTable />
    </div>
  )
}

export default People
