import {API, AxiosError} from 'utils/axios'
import {useQuery} from 'utils/react-query'

const getNotifications = async () => {
  const res = await API.get('/api/notifications?page=0&size=20')
  // console.log(res)
  return res?.data.data
}

export const useNotifications = active => {
  const callback = active === '활동 알림' ? () => getNotifications() : () => getFriendRequests()
  return useQuery(['notifications', active], callback)
}

const getFriendRequests = async () => {
  const res = await API.get('/api/friends/requests')

  return res?.data.data
}
