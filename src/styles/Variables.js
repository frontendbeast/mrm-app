const paletteMaster = {
  black: '#222',
  grey: '#ccc',
  red: '#b81a1b',
  white: '#fff',
  yellow: '#fd0',
};

export const palette = {
  primary: paletteMaster.yellow,
  primaryText: paletteMaster.black,
  secondary: paletteMaster.red,
  secondaryText: paletteMaster.white,
  tertiary: paletteMaster.black,
  tertiaryText: paletteMaster.yellow,
};

export const colors = {
  header: palette.primary,
  listItemHeader: palette.tertiary,
  listItemHeaderText: palette.tertiaryText,
  listItemBorder: paletteMaster.grey,
};

export const dimensions = {
  fontSizeHeader: 16,
  gutter: 16,
  statusBarHeight: 20,
};
