import { Dimensions, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const lineHeight = Platform.select({ android: 0.5, ios: 0.25 });

function scaleV(d) {
  return Math.round((d * SCREEN_HEIGHT) / 812);
}

function scaleH(d) {
  return Math.round((d * SCREEN_WIDTH) / 375);
}

const dimension = {
  BORDER_RADIUS: 4,
  DISTANCE_1: 4,
  DISTANCE_2: 8,
  DISTANCE_3: 16,
  DISTANCE_4: 24,
  DISTANCE_5: 32,
  DISTANCE_6: 36,
  DISTANCE_7: 48,

  MARGIN: 24,
  MARGIN_COMPONENT: 16,
  MARGIN_TOP: 36,
  MULTI_TEXT_HEIGHT: 120,
  PADDING: 24,
  PADDING_CONTENT: 8,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
};

export { lineHeight, scaleV, scaleH, dimension };
