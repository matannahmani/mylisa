import React from "react";
import { extendTheme, v3CompatibleTheme } from "native-base";

const KKCSTheme = {
  colors: {
    BLOrange: {
      "50": "#fbeae7",
      "100": "#ffcebc",
      "200": "#ffaf90",
      "300": "#ff9163",
      "400": "#ff7940",
      "500": "#ff631b",
      "600": "#f45d17",
      "700": "#e65611",
      "800": "#d84f0e",
      "900": "#bf4205",
    },
    BLGray: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#efefef",
      "300": "#e2e2e2",
      "400": "#bfbfbf",
      "500": "#a0a0a0",
      "600": "#777777",
      "700": "#636363",
      "800": "#444444",
      "900": "#222222",
    },
    BLYellow: {
      "50": "#fefce5",
      "100": "#fef6c0",
      "200": "#fcf097",
      "300": "#fbea6d",
      "400": "#fae64c",
      "500": "#f8e027",
      "600": "#f7cf24",
      "700": "#f5b71d",
      "800": "#f39f15",
      "900": "#ef7507",
    },
    BLGreen: {
      "50": "#e7f8e8",
      "100": "#c5eec7",
      "200": "#9ee3a3",
      "300": "#71d97c",
      "400": "#49d05d",
      "500": "#00c63b",
      "600": "#00b632",
      "700": "#00a324",
      "800": "#009216",
      "900": "#007200",
    },
    BLWhite: {
      "50": "#ffffff",
      "100": "#fafafa",
      "200": "#f5f5f5",
      "300": "#f0f0f0",
      "400": "#ffffff",
      "500": "#ffffff",
      "600": "#979797",
      "700": "#818181",
      "800": "#606060",
      "900": "#3c3c3c",
    },
  },
  components: {
    Text: {
      baseStyle: {
        // _light: {color: 'black'},
        // _dark: {color: 'white'}
      },
    },
    Button: {
      baseStyle: {
        // borderRadius: "10px",
        w: "90%",
        h: "52px",
        android_ripple: { color: "#24292F33", borderless: false },
        _text: { color: "white" },
        _dark: {
          _text: { color: "white" },
        },
      },
      variants: {
        rounded: ({ colorScheme }: any) => {
          return {
            bg: `${colorScheme}.500`,
            rounded: "full",
          };
        },
        keyweGhost: ({}) => {
          return {
            borderRadius: 10,
            _dark: {
              border: "1px",
              borderColor: "white",
              bg: "transparent",
            },
            _white: {
              bg: "#FF631B",
              _text: {
                color: "white",
              },
            },
          };
        },
      },
    },
    Input: {
      variants: {
        dark: () => {
          return {
            _focus: { border: "1px solid #71E689" },
            color: "white",
            bg: "#252B40",
            borderRadius: 10,
            autoCapitalize: "none",
            isFullWidth: true,
            _disabled: { opacity: 0.8, bg: "#252B40" },
          };
        },
      },
    },
  },
};

// extend theme
export const KKCSExtendedTheme = extendTheme(KKCSTheme);

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof KKCSExtendedTheme;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
