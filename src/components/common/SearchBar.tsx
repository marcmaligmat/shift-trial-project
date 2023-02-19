import React, { useState } from "react"
import { useAppContext } from "../../Context/AppContext"

import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment } from "@mui/material"

import AddIcon from "@mui/icons-material/Add"

const Search = () => {
  const [isSelected, setIsSelected] = useState(false)
  const { state, setState } = useAppContext()

  const handlSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase()
    const searchedData = state.originalData.filter((item) => {
      return searchText.toLowerCase() === ""
        ? item
        : item.completeName.toLowerCase().includes(searchText)
    })
    setState({ filteredData: searchedData })
  }

  const iconAdornment = !isSelected
    ? {
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }
    : {}

  return (
    <div className="flex items-center justify-between mt-3">
      <TextField
        sx={{ width: "400px" }}
        label="Search members"
        variant="outlined"
        InputProps={iconAdornment}
        onFocus={(e) => setIsSelected(true)}
        onBlur={(e) => setIsSelected(false)}
        onChange={handlSearchBar}
      />
      <button className="px-4 py-2 m-4 border rounded-md">
        <AddIcon sx={{ fontSize: "25px" }} />
        Invite People
      </button>
    </div>
  )
}

export default Search
