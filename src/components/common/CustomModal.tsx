import React from 'react'
import {View, Modal, ModalProps, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'

type Props = ModalProps & {
  title: string
  content: string
  cancel_text: string
  complete_text: string
  onCompletePress: () => void
}

const CustomModal = ({
  visible,
  animationType = 'fade',
  onRequestClose,
  style,
  title,
  content,
  cancel_text,
  complete_text,
  onCompletePress,
}: Props) => {
  return (
    <Modal visible={visible} transparent={true} animationType={animationType} onRequestClose={onRequestClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal_container, style]}>
          <Text style={styles.modal_title}>{title}</Text>
          <Text style={styles.modal_content}>{content}</Text>
          <View style={styles.modal_buttons}>
            <TouchableOpacity style={styles.modal_cancel} onPress={onRequestClose}>
              <Text style={styles.modal_cancel_text}>{cancel_text}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modal_complete} onPress={onCompletePress}>
              <Text style={styles.modal_complete_text}>{complete_text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal_container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modal_title: {...font.NotoSansKR_Medium, fontSize: 20, marginBottom: 10},
  modal_content: {...font.NotoSansKR_Regular, fontSize: 14, lineHeight: 19.6, color: '#666', textAlign: 'center'},
  modal_buttons: {marginTop: 24, flexDirection: 'row'},
  modal_cancel: {
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 12,
    marginRight: 6,
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  modal_cancel_text: {
    ...font.NotoSansKR_Medium,
    fontSize: 14,
  },
  modal_complete: {
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
  },
  modal_complete_text: {
    ...font.NotoSansKR_Medium,
    fontSize: 14,
    color: '#fff',
  },
})
