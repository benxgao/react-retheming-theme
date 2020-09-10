import deepmerge from 'merge-options';
import defaultTheme from './themes/default';
import { CustomRethemingThemeArgs, RethemingTheme, RethemingComponentProps } from './types';

const customRethemingTheme = ({
  colors,
  components,
  isColorReset = true,
}: CustomRethemingThemeArgs): RethemingTheme => {
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
