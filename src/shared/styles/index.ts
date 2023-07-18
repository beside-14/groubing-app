type FontType = {
  fontFamily: string
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}
type FontFamilyType =
  | 'Montserrat_Bold'
  | 'Montserrat_ExtraBold'
  | 'NotoSansKR_Black'
  | 'NotoSansKR_Bold'
  | 'NotoSansKR_Medium'
  | 'NotoSansKR_Regular'
  | 'NotoSansKR_Light'
  | 'NotoSansKR_Thin'

export const font: Record<FontFamilyType, FontType> = {
  Montserrat_Bold: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
  Montserrat_ExtraBold: {
    fontFamily: 'Montserrat-ExtraBold',
    fontWeight: '800',
  },
  NotoSansKR_Black: {
    fontFamily: 'NotoSansKR-Black',
    fontWeight: '900',
  },
  NotoSansKR_Bold: {
    fontFamily: 'NotoSansKR-Bold',
    fontWeight: '700',
  },
  NotoSansKR_Medium: {
    fontFamily: 'NotoSansKR-Medium',
    fontWeight: '500',
  },
  NotoSansKR_Regular: {
    fontFamily: 'NotoSansKR-Regular',
    fontWeight: '400',
  },
  NotoSansKR_Light: {
    fontFamily: 'NotoSansKR-Light',
    fontWeight: '300',
  },
  NotoSansKR_Thin: {
    fontFamily: 'NotoSansKR-Thin',
    fontWeight: '100',
  },
}
