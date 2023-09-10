import {API} from 'utils/axios'

export const patchPassword = async (id: number, beforePassword: string, afterPassword: string) => {
  const res = await API.patch(`/api/members/${id}/password`, {beforePassword: beforePassword, afterPassword: afterPassword})
  return res
}
