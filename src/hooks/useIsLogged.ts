import {removeToken} from 'utils/asyncStorage'
import {useRoutes} from './useRoutes'

export const useIsLogged = () => {
  const {resetNavigation} = useRoutes()
  const login = () => {
    resetNavigation('Main')
  }

  const logout = async () => {
    await removeToken()
    resetNavigation('Auth')
  }

  return {login, logout}
}
