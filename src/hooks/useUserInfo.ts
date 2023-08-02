import {useAtom} from 'utils/jotai'
import {userInfoAtom} from 'store'

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)

  return {userInfo, setUserInfo}
}

export default useUserInfo
