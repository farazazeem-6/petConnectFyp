export const MOBILE_OS = ['Android', 'iOS', 'HarmonyOS', 'webOS', 'IEMobile', 'Opera Mini'] as const

export const MOBILE_DEVICES = ['iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'] as const

export type MobileOS = (typeof MOBILE_OS)[number]
export type MobileDevice = (typeof MOBILE_DEVICES)[number]
