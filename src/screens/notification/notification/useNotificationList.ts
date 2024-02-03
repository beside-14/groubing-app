import {API, AxiosError} from 'utils/axios'
import {useQuery} from 'utils/react-query'

const getNotifications = async () => {
  const res = await API.get('/api/notifications?page=0&size=20')

  return res?.data.data
}

export const useNotifications = active => {
  if (active === '활동 알림') return useQuery(['notifications', active], () => getNotifications())

  return useQuery(['notifications', active], () => getFriendRequests())
}

const getFriendRequests = async () => {
  const res = await API.get('/api/friends/requests')

  return res?.data?.data
}
