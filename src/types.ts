export interface RethemingTheme {
  colors: any;
  components: any;
  utils: object;
}

export interface CustomRethemingThemeArgs {
  colors: any;
  components: any;
  isColorReset: boolean;
}

export interface RethemingComponentProps {
  theme: RethemingTheme;
  rethemingComponentName: string;
  rethemingStyles?: any;
}
