import {login as KakaoLogin, getProfile} from '@react-native-seoul/kakao-login'
import appleAuth from '@invertase/react-native-apple-authentication'

export const getAppleInfo = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })
  return appleAuthRequestResponse
}

export const getKakaoInfo = () => {
  getProfile()
    .then(async result => {
      console.log('카카오 리절트', result)
      //   handleLogin('KAKAO', result)
    })
    .catch(error => {
      return console.log(`GetProfile Fail(code:${error.code})`, error.message)
    })
}

export const useUser = () => {
  const handleLoginButton = async (type: 'KAKAO' | 'APPLE') => {
    switch (type) {
      case 'KAKAO':
        getKakaoInfo()
        break

      case 'APPLE':
        // let info = getAppleInfo()
        break
      default:
        // let info = '웅웅'
        break
    }
  }
  const logout = () => {}
  const updateInfo = () => {}

  return {handleLoginButton, logout, updateInfo}
}
