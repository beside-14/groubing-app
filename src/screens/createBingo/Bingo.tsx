import {useAuth} from 'hooks/useAuth'
import {View} from 'react-native'
import {useEffect} from 'react'
import {Text} from 'react-native'
import React from 'react'
import CreateBingo from 'components/bingo/create/CreateBingo'

const Bingo = () => {
  const {changeNavigationStack} = useAuth()

  // useEffect(() => {
  //   setNavigateState()
  // }, [])

  return <CreateBingo />
}

export default Bingo
