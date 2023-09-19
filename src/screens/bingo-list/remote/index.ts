import {API} from 'utils/axios'

export const getBingoList = async id => {
  const res = await API.get(`/api/bingo-boards?memberId=${id}`)
  return res
}
