import {useQuery} from '@tanstack/react-query'
import {API} from 'utils/axios'

const getFeeds = async () => {
  const res = await API.get('/api/feeds')

  return res.data.data
}

const getFriendsFeed = async () => {
  const res = await API.get('/api/friend-feeds')

  return res.data.data
}

export const useFeeds = (type: 'friend' | 'all') => {
  let callback = type === 'all' ? () => getFeeds() : () => getFriendsFeed()

  const {data} = useQuery(['feeds', type], callback, {staleTime: 300000, cacheTime: 300000})

  const res = data?.map((item: {memberId: any; nickname: any; profile: any; feedItems: any}) => {
    return {title: {id: item.memberId, name: item.nickname, profile: item.profile}, data: item.feedItems}
  })

  return {data: res}
}
