import deepmerge from 'merge-options';
import defaultTheme from './themes/default';

const customRethemingTheme = ({ colors, components, isColorReset = true }) => {
  const newColors = isColorReset ? colors : deepmerge(defaultTheme.colors, colors);

  const newTheme = {
    colors: newColors,
    components: deepmerge(defaultTheme.components, components),
    utils: defaultTheme.utils,
  };

  return newTheme;
};

const rethemeComponent = (rethemeDefaultStyles) => ({
  theme,
  rethemingStyles,
  rethemingComponentName,
}) =>
  deepmerge(
    rethemeDefaultStyles({ theme, rethemingStyles, rethemingComponentName }),
    rethemingStyles,
    theme.components[rethemingComponentName]
  );

export { customRethemingTheme, rethemeComponent };
