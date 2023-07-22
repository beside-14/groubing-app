import {removeToken} from 'utils/asyncStorage'
import {isLoggedAtom} from 'store'
import {useSetAtom} from 'utils/jotai'

export const useIsLogged = () => {
  const setIsLogged = useSetAtom(isLoggedAtom)
  const login = () => {
    setIsLogged(true)
  }

  const logout = async () => {
    await removeToken()
    setIsLogged(false)
  }

  return {login, logout}
}
