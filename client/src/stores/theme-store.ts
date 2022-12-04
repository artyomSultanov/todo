import { makeAutoObservable } from 'mobx'
enum Themes {
  light = 'light',
  dark = 'dark',
}
type ThemeType = keyof typeof Themes

export interface ThemeStoreModel {
  theme: ThemeType
  setTheme(): void
  changeTheme(): void
}

class ThemeStore implements ThemeStoreModel {
  theme: ThemeType
  constructor() {
    makeAutoObservable(this)
    this.theme = this.setInitialTheme()
    this.setTheme()
  }

  setTheme = (): void => {
    document.documentElement.dataset.theme = this.theme
    localStorage.setItem('theme', this.theme)
  }

  changeTheme = (): void => {
    if (this.theme === 'dark') this.theme = 'light'
    else this.theme = 'dark'
    this.setTheme()
  }

  private setInitialTheme = (): ThemeType => {
    // Ищем тему в localStorage
    const localTheme: ThemeType = `${window.localStorage.getItem(
      'theme'
    )}` as ThemeType
    if (Themes[localTheme]) return Themes[localTheme]

    // Ищем предпочтительную тему пользователя
    const userPrefersLightTheme = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches
    if (userPrefersLightTheme) return Themes.light

    return 'dark'
  }
}

export default ThemeStore
