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
  appBG: '#000',

  header: palette.tertiary,

  homeGridTextBG: paletteMaster.white,
  homeGridText: paletteMaster.black,
  homeGridTextFeatureBG: palette.primary,
  homeGridTextFeature: palette.primaryText,

  listItemHeader: palette.tertiary,
  listItemHeaderText: palette.tertiaryText,
  listItemBorder: paletteMaster.grey,
  listItemText: palette.primaryText,

  text: paletteMaster.black,
  textBG: paletteMaster.white,
};

export const dimensions = {
  fontSizeHeader: 16,
  gutter: 16,
};
