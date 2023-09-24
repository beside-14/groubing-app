import {API} from 'utils/axios'

export const requestFriends = async (id: number) => {
  const res = await API.post('/api/friends', {inviteeId: id})

  return res.status === 200 ? true : false
}
