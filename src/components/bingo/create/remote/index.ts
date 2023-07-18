import {API} from 'utils/axios'

type FormType = {title: string; goal: number; boardType: string; open: boolean; since?: string; until?: string; bingoSize: number}

export const createBingo = async (form: FormType): Promise<any> => {
  const {data} = await API.post('/api/bingo-boards', form)
  return data
  console.log('포스트 결과', data)
}
