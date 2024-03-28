// import {useQuery} from '@tanstack/react-query"'
import {useQuery} from '@tanstack/react-query'
import {API} from 'utils/axios'

const getFriendList = async () => {
  const res = await API.get('/api/friends/targets')

  return res?.data?.data
}

export const useFriendList = () => {
  return useQuery(['search-friend'], () => getFriendList())
}
