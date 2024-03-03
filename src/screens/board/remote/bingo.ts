import {API} from 'utils/axios'

export const getBingo = async (bingoid: number, memberId: number) => {
  const res = await API.get(`/api/bingo-boards/${bingoid}?memberId=${memberId}`)
  return res
}

export const deleteBingo = async id => {
  const res = await API.delete(`/api/bingo-boards/${id}`)
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

export const registerItem = async (content: {title: string; subTitle: string}, boardid: any, bingoId: number) => {
  const res = await API.put(`/api/bingo-boards/${boardid}/bingo-items/${bingoId}`, content)
  return res
}

export const shuffleItems = async (boardid: number) => {
  const res = await API.put(`/api/bingo-boards/${boardid}/bingo-items`)
  return res
}

export const publicBoard = async (boardid: number, isopen: boolean) => {
  let payload = {
    open: isopen,
  }
  const res = await API.patch(`/api/bingo-boards/${boardid}/open`, payload)
  return res
}

export const getFriends = async () => {
  const res = await API.get(`/api/friends`)
  return res
}

export const publishBingo = async (id: number, date: {since: string; until: string}, members: number[]) => {
  let payload = {
    bingoMembers: members,
    since: date.since,
    until: date.until,
  }
  const res = await API.patch(`/api/bingo-boards/${id}/publish-info`, payload)
  return res
}
