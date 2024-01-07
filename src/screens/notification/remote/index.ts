import {API} from 'utils/axios'

export const refuseFriend = async (id: number) => {
  const res = await API.patch(`/api/friends/${id}/reject`)

  return console.log(res)
}

export const acceptFriend = async (id: number) => {
  const res = await API.patch(`/api/friends/${id}/accept`)

  return res
}
