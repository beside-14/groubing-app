import {isLoggedAtom} from 'store'
import {useAtom} from 'utils/jotai'

export const useAuth = () => {
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom)

  // navigation stack 인증 로직 분리
  const changeNavigationStack = () => {
    setIsLogged(prev => !prev)
  }

  return {isLogged, changeNavigationStack}
}
