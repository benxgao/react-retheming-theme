import deepmerge from 'merge-options';
import defaultTheme from './themes/default';

interface RethemingTheme {
  colors: object;
  components: object;
  utils: object;
}

interface customRethemingThemeArgs {
  colors: object;
  components: object;
  isColorReset: boolean;
}

interface RethemingComponentProps {
  theme: RethemingTheme;
  rethemingComponentName: string;
  rethemingStyles?: object;
}

const customRethemingTheme = ({
  colors,
  components,
  isColorReset = true,
}: customRethemingThemeArgs): RethemingTheme => {
  const newColors = isColorReset ? colors : deepmerge(defaultTheme.colors, colors);

  const newTheme = {
    colors: newColors,
    components: deepmerge(defaultTheme.components, components),
    utils: defaultTheme.utils,
  };

  return newTheme;
};

const rethemeComponent = (rethemeDefaultStyles: any) => ({
  theme,
  rethemingStyles,
  rethemingComponentName,
}: RethemingComponentProps) =>
  deepmerge(
    rethemeDefaultStyles({ theme, rethemingStyles, rethemingComponentName }),
    rethemingStyles,
    theme.components[rethemingComponentName] || {}
  );

export { customRethemingTheme, rethemeComponent };
