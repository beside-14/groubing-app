import {useRoute, useNavigation, StackActions, CommonActions} from '@react-navigation/native'

export const useRoutes = () => {
  const navigation: LooseObject = useNavigation()
  const {name, params} = useRoute()

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

  const back = () => {
    navigation.dispatch(CommonActions.goBack)
  }

  const resetNavigation = (path: string) => {
    navigation.reset({index: 0, routes: [{name: path}]})
  }

  return {navigate, back, resetNavigation}
}
