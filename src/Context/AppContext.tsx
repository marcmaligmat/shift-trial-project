import { createContext, ReactNode, useContext, useReducer } from "react"
import { ResultsDataInterface, FinalDataInterface } from "../App"

export type AppContextType = {
  isLoading: boolean
  errorOnQuery: boolean
  idToDelete: string | null
  resultsData: ResultsDataInterface[]
  originalData: FinalDataInterface[]
  filteredData: FinalDataInterface[]
}

interface AppContextInterface {
  state: AppContextType
  setState: React.Dispatch<Partial<AppContextType>>
}

const AppContext = createContext<AppContextInterface>({} as AppContextInterface)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useReducer(dispatcher, {
    isLoading: true,
    idToDelete: null,
    errorOnQuery: false,
    resultsData: [],
    originalData: [],
    filteredData: [],
  })

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>
}

const dispatcher = (state: AppContextType, action: Partial<AppContextType>) => ({
  ...state,
  ...action,
})

export const useAppContext = () => useContext(AppContext)
