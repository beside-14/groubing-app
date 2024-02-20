import {useAtom} from 'utils/jotai'
import {userData} from 'store'
import {clearAllAsyncStorage, getUserInfo, setUserInfo} from 'utils/asyncStorage'

export const init = {
  id: 0,
  email: '',
  nickname: '',
  profileUrl: '',
  token: '',
}
const useUserInfo = () => {
  const [user, setUser] = useAtom(userData)

  const updateUserData = async data => {
    const info = await getUserInfo()
    let obj = {...info, ...data}
    setUserInfo(obj)
    setUser(obj)
  }

  const clearUserInfo = async () => {
    await clearAllAsyncStorage()
    setUser(init)
  }

  const initUserInfo = async () => {
    const info = await getUserInfo()

    setUser(info)
  }

  return {user, setUserInfo, updateUserData, initUserInfo, clearUserInfo}
}

export default useUserInfo
