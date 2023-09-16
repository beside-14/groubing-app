import {useQuery} from '@tanstack/react-query'
import {API} from 'utils/axios'

const getFeeds = async () => {
  const res = await API.get('/api/feeds')

  return res.data.data
}

export const useFeeds = () => {
  const {data} = useQuery(['feeds'], () => getFeeds())

  const res = data?.map(item => {
    return {title: {id: item.memberId, name: item.nickname, profile: item.profile}, data: item.feedItems}
  })

  return {data: res}
}
