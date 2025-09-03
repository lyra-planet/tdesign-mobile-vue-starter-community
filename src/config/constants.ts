export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

export const BUSINESS_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  TOKEN_EXPIRED: 401,
  NO_PERMISSION: 403,
} as const

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  THEME: 'theme',
  LOCALE: 'locale',
  SETTINGS: 'settings',
} as const

export const ROUTE_NAMES = {
  LOGIN: 'Login',
  HOME: 'Home',
  MY: 'My',
  NOTICE: 'Notice',
  SEARCH: 'Search',
  TALKLIST: 'TalkList',
  DATACENTER: 'DataCenter',
  PUBLISH: 'Publish',
} as const

export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

export const LOCALE_TYPE = {
  ZH_CN: 'zh-cn',
  EN_US: 'en-us',
} as const

export const DEVICE_TYPE = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const

export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const

export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
} as const

export const REGEXP = {
  PHONE: /^1[3-9]\d{9}$/,
  EMAIL: /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  ID_CARD: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/i,
} as const

export const DEFAULT_CONFIG = {
  PAGE_SIZE: 20,
  REQUEST_TIMEOUT: 30000,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
} as const
