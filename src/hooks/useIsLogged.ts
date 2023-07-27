import {removeToken} from 'utils/asyncStorage'
import {isLoggedAtom} from 'store'
import {useSetAtom} from 'utils/jotai'

export const useIsLogged = () => {
  const setIsLogged = useSetAtom(isLoggedAtom)
  const login = () => {
    setIsLogged(true)
  }

  const logout = async () => {
    try {
      await removeToken()
      setIsLogged(false)
    } catch (error) {
      // TODO: 로그아웃 실패 toast
    }
  }

  return {login, logout}
}
