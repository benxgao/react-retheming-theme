export interface StyledTheme {
  colors: any;
  components: object;
  utils: any;
}

export interface ThemeProps {
  theme: StyledTheme;
  rethemingComponentName?: string;
  rethemingStyles?: object;
}
