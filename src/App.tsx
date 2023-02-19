import "./App.css"
import { useAppContext } from "./Context/AppContext"
import { useEffect } from "react"
import People from "./components/People"
import { useQuery } from "react-query"

export interface ResultsDataInterface {
  firstName: string
  lastName: string
  status: string
  email: string
}

export interface FinalDataInterface extends ResultsDataInterface {
  id: string
  completeName: string
  numRow?: number
}

const fetchUsers = async (): Promise<ResultsDataInterface[]> => {
  const response = await fetch("https://voicetest20202.s3.amazonaws.com/users.json")
  if (!response.ok) {
    throw new Error("Something went wrong!")
  }
  return response.json()
}

const App: React.FC = () => {
  const { state, setState } = useAppContext()

  const {
    data: users,
    isLoading: isLoadingRQ,
    error,
  } = useQuery<ResultsDataInterface[], ErrorConstructor>("users", fetchUsers)

  useEffect(() => {
    isLoadingRQ && setState({ isLoading: true })
    console.log(state.isLoading)
  }, [isLoadingRQ, setState, state.isLoading])

  useEffect(() => {
    if (users) {
      let looprow = 0
      const finalData = users.map((result) => {
        looprow += 1
        return {
          ...result,
          completeName: `${result.firstName} ${result.lastName}`,
          id: crypto.randomUUID(),
          numRow: looprow,
        }
      })
      setState({ originalData: finalData, filteredData: finalData, isLoading: false })
    }
  }, [users, setState])

  useEffect(() => {
    !users && !error && setState({ isLoading: true })
  }, [users, setState, state.isLoading, error])

  useEffect(() => {
    error && setState({ errorOnQuery: true, isLoading: false })
  }, [error, setState])

  return (
    <>
      <div className="header"></div>
      <div className="flex h-full gap-5 p-10">
        <div
          style={{ backgroundImage: "url(./sidebar.svg)" }}
          className="sideBar w-3/12  min-h-[70vh] border-slate-500"
        ></div>
        <div className="w-7/12 ">
          <People />
        </div>
      </div>
    </>
  )
}
export default App
