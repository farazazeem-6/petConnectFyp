import { MOBILE_OS, MOBILE_DEVICES } from '@/constants'

/**
 * Detects if the current device is a mobile device
 * @returns {boolean} True if the device is mobile, false otherwise
 */
export const isMobileDevice = (): boolean => {
  // Server-side rendering check
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  const ua = navigator.userAgent

  // Check for mobile devices in user agent
  const hasDeviceMatch = MOBILE_DEVICES.some(device => new RegExp(device, 'i').test(ua))

  // Check for mobile OS in user agent
  const hasOSMatch = MOBILE_OS.some(os => new RegExp(os, 'i').test(ua))

  // Check for touch support
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  return hasDeviceMatch || hasOSMatch || hasTouchSupport
}

/**
 * Detects if the current device is a tablet
 * @returns {boolean} True if the device is a tablet, false otherwise
 */
export const isTabletDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  const ua = navigator.userAgent

  // Check for tablet-specific patterns
  const isIPad = /iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)
  const isAndroidTablet = /Android/i.test(ua) && !/Mobile/i.test(ua)

  return isIPad || isAndroidTablet
}

/**
 * Detects the type of device
 * @returns {'mobile' | 'tablet' | 'desktop'} The device type
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (isTabletDevice()) {
    return 'tablet'
  }
  if (isMobileDevice()) {
    return 'mobile'
  }
  return 'desktop'
}

/**
 * Detects if the device is iOS
 * @returns {boolean} True if the device is iOS, false otherwise
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  return /iPhone|iPad|iPod/i.test(navigator.userAgent) || (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1)
}

/**
 * Detects if the device is Android
 * @returns {boolean} True if the device is Android, false otherwise
 */
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  return /Android/i.test(navigator.userAgent)
}
