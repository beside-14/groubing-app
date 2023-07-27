import {API} from 'utils/axios'

type ItemType = {
  baordId: number
  itemId: number
  title: string
  subTitle: string
}

export const registerItem = async (item: ItemType): Promise<any> => {
  const {baordId, itemId, title, subTitle} = item
  const {data} = await API.put(`/api/bingo-boards/${baordId}/bingo-items/${itemId}`, {
    title: title,
    subTitle: subTitle,
  })

  if (data.code === 'OK') return console.log('아이템 등룍완료')
  return console.log('아이템 등록실패 error')
}

export const updateMemo = async (baordId: number, content: string) => {
  const payload = {
    memo: content,
  }
  return await API.patch(`/api/bingo-boards/${baordId}/memo`, payload)
}

export const updateBingoInfo = async (baordId: number, payload: any) => {
  //일단 날짜 고정
  payload = {
    ...payload,
    since: '2023-07-21',
    until: '2023-08-28',
  }
  const res = await API.patch(`/api/bingo-boards/${baordId}/base`, payload)
  return res
}
