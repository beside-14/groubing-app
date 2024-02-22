import {API} from 'utils/axios'
import {useQuery} from 'utils/react-query'

const getFriendList = async () => {
  const res = await API.get('/api/friends')
  // console.log(res)
  return res?.data.data
}

const getFriendRequestList = async () => {
  const res = await API.get('/api/friends/requests')

  return res?.data.data
}

export const useFriendList = (category: '친구' | '요청') => {
  if (category === '친구') return useQuery(['friendList', category], () => getFriendList())
  return useQuery(['friendList', category], () => getFriendRequestList())
}
