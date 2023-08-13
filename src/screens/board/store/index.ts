import {format} from 'date-fns'
import {atom} from 'jotai'
import {atomWithReset, atomWithStorage} from 'jotai/utils'

type BingoBaseType = {
  title: string
  goal: number
  boardType: string
  open: boolean
  bingoSize: number
  since: string
  until: string
}

export const addMonths = (date, months) => {
  date.setMonth(date.getMonth() + months)

  return date
}
const dateobject = new Date()
const today = format(dateobject, 'yyyy-MM-dd')
const inituntil = format(addMonths(dateobject, 1), 'yyyy-MM-dd')

export const bingoBaseData = {
  title: '',
  goal: 3,
  boardType: 'SINGLE',
  open: true,
  bingoSize: 3,
  since: today,
  until: inituntil,
}

export const FORM_BASE_DATA = atomWithReset(bingoBaseData)
export const bingo_base_data_atom = atom<BingoBaseType>(bingoBaseData)
export const register_item_atom = atom<{mode: boolean; id: number | null}>({mode: false, id: null})
export const update_memo_atom = atom<{mode: boolean; content: string}>({mode: false, content: ''})
export const bingo_count_atom = atom<number>(0)
export const retech_atom = atom<boolean>(false)
export const show_edit_box_atom = atom<boolean>(false)
