import {useState, useEffect} from 'react'
import {getToken, getIsLogged, setIsLogged} from 'utils/asyncStorage'

export const useIsLogged = () => {
  const [isLogged, setIsLoggedState] = useState(false)

  // navigation stack 인증 로직 분리
  const changeNavigationStack = async () => {
    const _isLogged = await getIsLogged()
    setIsLogged(!_isLogged)
  }

  useEffect(() => {
    // 로그인 여부 확인
    const checkLoggedIn = async () => {
      const token = await getToken()
      if (token) {
        setIsLoggedState(true)
        return
      }
      setIsLogged(false)
    }
    checkLoggedIn()
  }, [])

  return {isLogged, changeNavigationStack}
}
