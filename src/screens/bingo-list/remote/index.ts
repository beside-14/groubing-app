import {useQuery} from '@tanstack/react-query'
import {API} from 'utils/axios'

export const getBingoList = async (id: number) => {
  const res = await API.get(`/api/bingo-boards?memberId=${id}`)
  return res.data.data
}

export const useBingoList = (id: number) => {
  return useQuery(['bingolist'], () => getBingoList(id), {enabled: !!id, staleTime: 300000, cacheTime: 300000})
}
