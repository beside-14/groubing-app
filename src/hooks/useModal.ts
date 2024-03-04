import {atom, useAtom} from 'jotai'

type ModalState = {
  [key: string]: boolean
}

export const modalStore = atom<ModalState>({
  board_more: false,
  public: false,
  invite: false,
  date: false,
  register_bingo: false,
  register_memo: false,
  feed_more: false,
  //   none: false,
})

export const useModal = (modalName: string) => {
  const [isOpenStates, setIsOpenStates] = useAtom(modalStore)
  const isOpen = (isOpenStates as ModalState)[modalName]

  const onOpen = () => {
    setIsOpenStates((prevState: ModalState) => ({
      ...prevState,
      [modalName]: true,
    }))
  }

  const onClose = () => {
    setIsOpenStates((prevState: ModalState) => ({
      ...prevState,
      [modalName]: false,
    }))
  }

  return {isOpen, onOpen, onClose}
}
