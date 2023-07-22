/**
 * @name API관련변수
 */
type SERVER = 'DEV' | 'PROD'
export const SERVER_ENV: SERVER = 'DEV'
export const API_URL = SERVER_ENV === 'DEV' ? 'http://49.50.175.32:8080' : ''
