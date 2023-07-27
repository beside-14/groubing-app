import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_STORAGE_KEY = 'accessToken'
const USER_INFO_STORAGE_KEY = 'userInfo'

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
  } catch (error) {
    console.error('Error storing token:', error)
  }
}

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
    return token === null ? '' : token
  } catch (error) {
    console.error('Error retrieving token:', error)
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
  } catch (error) {
    console.error('Error removing token:', error)
  }
}

export const setUserInfo = async (data: UserInfoType) => {
  try {
    await AsyncStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error storing userInfo', error)
  }
}

export const getUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem(USER_INFO_STORAGE_KEY)
    return userInfo === null ? null : JSON.parse(userInfo)
  } catch (error) {
    console.error('Error retrieving userInfo', error)
  }
}

export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem(USER_INFO_STORAGE_KEY)
  } catch (error) {
    console.error('Error removing userInfo:', error)
  }
}

export const setAsyncStorage = async (key: string, value: string | object | null) => {
  let storage
  try {
    if (typeof value !== 'string') {
      storage = JSON.stringify(value)
    } else {
      storage = value
    }
    await AsyncStorage.setItem(key, storage)
  } catch (error) {
    console.error(`Error set ${key}:`, error)
  }
}

export const getAsyncStorage = async (key: string) => {
  try {
    let storage = (await AsyncStorage.getItem(key)) as string
    if (!!storage && storage.indexOf(',') === -1) {
      return storage
    }
    return JSON.parse(storage)
  } catch (error) {
    console.error(`Error get ${key}:`, error)
  }
}

export const removeAsyncStorage = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error('Error remove asyncStorage:', error)
  }
}

export const clearAllAsyncStorage = async () => {
  try {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        AsyncStorage.multiRemove(<string[]>keys)
      })
      .then(() => console.log(`//-----ClearAllAsyncStorage-----//`))
  } catch (error) {
    console.error('Error clear asyncStorage', error)
  }
}
