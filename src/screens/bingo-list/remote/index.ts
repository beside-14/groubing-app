import {API} from 'utils/axios'

export const getBingoList = async () => {
  const res = await API.get('/api/bingo-boards')

  return res
}
