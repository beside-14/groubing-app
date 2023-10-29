import {API, AxiosError} from 'utils/axios'
import {useQuery} from 'utils/react-query'

const getNotifications = async () => {
  const res = await API.get('/api/notifications?page=0&size=20')
  // console.log(res)
  return res?.data.data
}

export const useNotifications = () => {
  return useQuery(['notifications'], () => getNotifications())
}
