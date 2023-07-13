import {API} from 'utils/axios'

export const createBingo = async (): Promise<any> => {
  const {data} = await API.post('/api/bingo-boards', {
    title: '써드',
    goal: 4,
    boardType: 'SINGLE',
    open: false,
    since: '',
    until: '',
    bingoSize: 4,
  })
  return data
  //   console.log('포스트 테스트', data)
}
