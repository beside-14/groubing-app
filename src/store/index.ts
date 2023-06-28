import {atom} from "utils/jotai"

export const isLoggedAtom = atom(false) // 로그인 여부. navigation stack 로직 분리용.
