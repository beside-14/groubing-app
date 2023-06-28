import { isLoggedAtom } from "store"
import { useAtom } from "utils/jotai"
import {useRoute, useNavigation, StackActions} from "@react-navigation/native"

export const useRoutes = () => {
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom)
  const navigation: LooseObject = useNavigation()
  const {name, params} = useRoute()

  // navigation stack 인증 로직 분리
  const setNavigateState = () => {
    setIsLogged(prev => !prev)
  }

  const navigate = (path: string, options?: any) => {
    if (path === name) {
      // *----------------- 같은ScreenName경우 push처리
      push(path, options)
    } else {
      navigation.navigate(path, options)
    }
  }

  const push = (name: string, options?: any) => {
    navigation.dispatch(StackActions.push(name, options))
  }

  return {isLogged, setNavigateState, navigate}
}