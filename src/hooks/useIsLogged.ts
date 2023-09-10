import {clearAllAsyncStorage, removeToken} from 'utils/asyncStorage'
import {isLoggedAtom} from 'store'
import {useSetAtom} from 'utils/jotai'

export const useIsLogged = () => {
  const setIsLogged = useSetAtom(isLoggedAtom)

  const login = () => {
    setIsLogged(true)
    // 6시간 후에 토큰 만료
    // 로그아웃
    setTimeout(() => {
      logout()
    }, 6 * 60 * 60 * 1000)
  }

  const logout = async () => {
    try {
      await clearAllAsyncStorage()
      // await removeToken()
      setIsLogged(false)
      //TODO: 로그아웃 완료 toast
    } catch (error) {
      // TODO: 로그아웃 실패 toast
    }
  }

  return {login, logout}
}
