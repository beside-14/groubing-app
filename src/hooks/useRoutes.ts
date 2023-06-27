import { isLoggedAtom } from "store";
import { useAtom } from "utils/jotai"

export const useRoutes = () => {
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom)

  const setNavigateState = () => {
    setIsLogged(prev => !prev)
  }

  return {setNavigateState}
}