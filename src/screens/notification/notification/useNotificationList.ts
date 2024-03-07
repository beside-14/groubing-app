import {API} from 'utils/axios'
import {useQuery} from 'utils/react-query'

const getNotifications = async () => {
  const res = await API.get('/api/notifications?page=0&size=20')

  return res?.data?.data
}

const getReceivedRequests = async () => {
  const res = await API.get('/api/friends/received-requests')

  return res?.data?.data
}

const getSendedRequests = async () => {
  const res = await API.get('/api/friends/send-requests')

  return res?.data?.data
}

export const useNotifications = (active: '활동 알림' | '보낸 요청' | '받은 요청') => {
  if (active === '활동 알림') return useQuery(['notifications', active], () => getNotifications())
  if (active === '보낸 요청') return useQuery(['notifications', active], () => getSendedRequests())
  return useQuery(['notifications', active], () => getReceivedRequests())
}
