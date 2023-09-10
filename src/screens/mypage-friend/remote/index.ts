import {API, AxiosError} from 'utils/axios'
import {useQuery} from 'utils/react-query'

const getFriendList = async () => {
  const res = await API.get('/api/friends')
  // console.log(res)
  return res?.data
}

export const useFriendList = () => {
  return useQuery(['friendList'], () => getFriendList())
}
