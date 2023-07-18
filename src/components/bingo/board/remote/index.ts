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

  if (data.code === 'OK') return console.log('성공완')
  return console.log('싪패', data)
}

export const updateMemo = async (baordId: number, content: string) => {
  const payload = {
    memo: content,
  }
  await API.patch(`/api/bingo-boards/${baordId}/memo`, payload)
}
