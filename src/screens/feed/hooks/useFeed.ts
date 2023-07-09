import {atom, useAtom} from 'utils/jotai'

const feedTabAtom = atom('0') // api 요청할 때 전달하는 값 확인.

const useFeed = () => {
  const [currentFeedTab, setCurrentFeedTab] = useAtom(feedTabAtom)

  return {currentFeedTab, setCurrentFeedTab}
}

export default useFeed
