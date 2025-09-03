export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'auto'
  primaryColor: string
  dynamicTheme: boolean
  themeTransition: boolean
  persistTheme: boolean
}

const themeConfig: ThemeConfig = {
  defaultTheme: 'light',
  primaryColor: '#0052d9',
  dynamicTheme: true,
  themeTransition: true,
  persistTheme: true,
}

export default themeConfig
