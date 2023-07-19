import axios from 'axios'
import {API} from 'utils/axios'

export const getBingo = async id => {
  const res = await API.get(`/api/bingo-boards/${id}`)
  return res
}

export const updateBingoItem = async (title: string, subTitle: string, id: number) => {
  const payload = {
    title: title,
    subTitle: subTitle,
  }
  const res = await API.put(`/api/bingo-boards/2/bingo-items/${id}`, payload)
  return res
}
export const updateItemState = async (updatetype: 'cancel' | 'complete', boardid: number, bingoId: number) => {
  const res = await API.patch(`/api/bingo-boards/${boardid}/bingo-items/${bingoId}/${updatetype}`, {})
  return res
}
