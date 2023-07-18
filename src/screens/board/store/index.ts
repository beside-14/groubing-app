import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

type BingoBaseType = {
  title: string
  goal: number
  boardType: string
  open: boolean
  bingoSize: number
}

let bingoBaseData = {
  title: '',
  goal: 3,
  boardType: 'SINGLE',
  open: false,
  //   since: '2023-05-01',
  //   until: '2023-05-20',
  bingoSize: 3,
}

export const bingo_base_data_atom = atom<BingoBaseType>(bingoBaseData)
