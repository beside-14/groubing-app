import React, {createRef, useEffect, useRef} from 'react'
import {View, StyleSheet, ViewStyle} from 'react-native'
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet'

type Props = {
  style?: ViewStyle
  onClose?: () => void
  visible?: boolean
  setVisible?: any
  component?: any
  // asProps?: ActionSheetProps
}
// Hook

export const useActionSheet = ({style, visible, onClose, setVisible, component}: Props): any => {
  // hooks
  const actionSheetRef = useRef<ActionSheetRef>()
  actionSheetRef.current?.hide()
  // actionSheetRef.current?.ExtraOverlayComponent()
  // *-------------------------------------------------------------------
  // *----- trigger감지하여실행

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(visible)
  }, [visible])

  // *----- 액션시트컨텐츠
  const actionSheet = () => {
    return (
      <ActionSheet
        id="ActionSheet"
        ref={actionSheetRef}
        onClose={() => {
          onClose && onClose()
          setVisible && setVisible(false)
        }}>
        <View style={[styles.actionSheet, style]}>{component()}</View>
      </ActionSheet>
    )
  }
  return {actionSheet, visible}
}

// styles
const styles = StyleSheet.create({
  /**@actionSheet */
  actionSheet: {paddingVertical: 10, minHeight: 200},
  /**@text */
})
