import theme from '../index';
import { customRethemingTheme } from '../utils';

describe('retheming theme', () => {
  describe('is composed by following 3 parts: ', () => {
    test('colors', () => {
      expect(theme.colors.red).toBeDefined();
      expect(theme.colors.yellow).toBeDefined();
      expect(theme.colors.blue).toBeDefined();
      expect(theme.colors.green).toBeDefined();
      expect(theme.colors.variables).toBeDefined();
    });

    test('components', () => {
      expect(theme.components).toEqual({});
    });

    test('utils', () => {
      expect(theme.utils).toBeDefined();
      expect(theme.utils.customRethemingTheme).toBeDefined();

      expect(theme.utils.rethemeComponent).toBeDefined();
      expect(typeof theme.utils.rethemeComponent).toBe('function');
    });
  });

  describe('can override default theming by customRethemingTheme()', () => {
    test('when components is overriden', () => {
      const components = {
        JustAnotherComponent: {
          variant: {
            primary: '#code-p',
          },
          background: '#code-b',
          color: '#code-c',
        },
      };

      const newTheme = customRethemingTheme({ components });

      // By default, theme.components is empty
      expect(theme.components).toEqual({});

      expect(newTheme.components).toEqual(components);
    });

    test('when colors is overriden with isColorReset=true (by default)', () => {
      const newColors = {
        lighten: '#code-l',
        base: '#code-b',
        darken: '#code-d',
      };

      const newTheme = customRethemingTheme({ colors: newColors });

      expect(theme.colors).not.toEqual(newColors);
      expect(newTheme.colors).toEqual(newColors);

      // The default color structure is overriden by new colors
      expect(newTheme.colors.red).not.toBeDefined();
      expect(newTheme.colors.variables).not.toBeDefined();
    });

    test('when colors is overriden with isColorReset=false', () => {
      const newColors = {
        lighten: '#code-l',
        base: '#code-b',
        darken: '#code-d',
      };

      const newTheme = customRethemingTheme({ colors: newColors, isColorReset: false });

      // The default colors structure remains the same
      expect(newTheme.colors).not.toEqual(newColors);
      expect(newTheme.colors.red).toBeDefined();
      expect(newTheme.colors.variables).toBeDefined();
    });
  });

  describe('can define component styles by rethemeComponent()', () => {
    const themePropsMock = {
      theme: {
        components: {
          StubComponent: {},
        },
      },
      rethemingStyles: {},
      rethemingComponentName: 'StubComponent',
    };

    const themeMockWithThemeStyleProp = {
      theme: {
        components: {
          StubComponent: {},
        },
      },
      rethemingStyles: {
        title: 'overrided style via passing props',
      },
      rethemingComponentName: 'StubComponent',
    };

    const themeMockWithDefinedInConfigFile = {
      theme: {
        components: {
          StubComponent: {
            title: 'style defined in theme.components',
          },
        },
      },
      rethemingStyles: {},
      rethemingComponentName: 'StubComponent',
    };

    const defaultThemeStyleMock = () => {
      return {
        title: 'default style defined in component',
      };
    };

    test('when default component styles is defined only', () => {
      const result = theme.utils.rethemeComponent(defaultThemeStyleMock)(themePropsMock);
      expect(result).toEqual({ title: 'default style defined in component' });
    });

    test('when rethemingStyles is defined', () => {
      const result = theme.utils.rethemeComponent(defaultThemeStyleMock)(
        themeMockWithThemeStyleProp
      );
      expect(result).toEqual({ title: 'overrided style via passing props' });
    });

    test('when component styles is defined in theme object', () => {
      const result = theme.utils.rethemeComponent(defaultThemeStyleMock)(
        themeMockWithDefinedInConfigFile
      );
      expect(result).toEqual({ title: 'style defined in theme.components' });
    });
  });
});
