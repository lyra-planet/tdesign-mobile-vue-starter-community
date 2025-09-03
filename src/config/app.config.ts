export interface AppConfig {
  title: string
  abbreviation: string
  version: string
  copyright: string
  footerCopyright: boolean
  progressBar: boolean
  keepAliveMaxNum: number
  routerMode: 'history' | 'hash'
  routesWhiteList: string[]
  loadingText: string
  logo: boolean | string
  errorLog: string[]
  loginInterception: boolean
  locale: string
  storageNS: string
}

const appConfig: AppConfig = {
  title: 'TDesign Mobile',
  abbreviation: 'tdm',
  version: '1.0.0',
  copyright: 'TDesign Mobile',
  footerCopyright: true,
  progressBar: true,
  keepAliveMaxNum: 10,
  routerMode: 'history',
  routesWhiteList: ['/login', '/register', '/404', '/403'],
  loadingText: '正在加载中...',
  logo: true,
  errorLog: ['development', 'production'],
  loginInterception: true,
  locale: 'zh-cn',
  storageNS: 'tdesign-mobile-',
}

export default appConfig
