import axios from 'axios'
import {API} from 'utils/axios'

export const getBingo = async (id) => {
  const res = await API.get(`/api/bingo-boards/${id}`)
  return res
}
