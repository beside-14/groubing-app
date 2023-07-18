export const removeWhitespace = (text: string) => {
  const regex = /\s/g
  return text.replace(regex, '')
}

export const maskEmail = (email: string) => {
  const atIndex = email.lastIndexOf('@')
  if (atIndex < 0) return email

  const username = email.slice(0, atIndex)
  const domain = email.slice(atIndex + 1)
  const maskedUsername = username.slice(0, -3) + '***'

  return maskedUsername + '@' + domain
}
