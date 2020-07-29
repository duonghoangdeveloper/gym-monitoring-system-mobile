import { StyleSheet } from 'react-native';

import { COLORS } from './colors';
import { DIMENSIONS } from './dimensions';

function scaleFont(fontSize) {
  const scaleFont = Math.round((fontSize * DIMENSIONS.SCREEN_WIDTH) / 375);
  if (scaleFont <= 12) return fontSize;
  return scaleFont;
}

const textStyle = StyleSheet.create({
  biggestTitle: {
    color: COLORS.dark20,

    // fontSize: scaleFont(42),
    fontFamily: 'Quicksand-Regular',
    fontSize: scaleFont(42),
  },
  biggestTitleBold: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(42),
  },
  bodyBigText: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(16),
  },
  bodyBigTextBold: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(16),
  },
  bodyText: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(14),
  },
  bodyTextBold: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(14),
  },
  label: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(12),
  },
  labelRegular: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(12),
  },
  sectionHeading: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Regular',
    fontSize: scaleFont(32),
  },
  sectionHeadingBold: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(32),
  },
  widgetItem: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(18),
  },
  widgetTitle: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(24),
  },
});

const textStyleObject = {
  biggestTitle: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Regular',
    fontSize: scaleFont(42),
  },
  biggestTitleBold: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(42),
  },
  bodyBigText: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(16),
  },
  bodyBigTextBold: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(16),
  },
  bodyText: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(14),
  },
  bodyTextBold: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(14),
  },
  label: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(12),
  },
  labelRegular: {
    color: COLORS.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(12),
  },
  sectionHeading: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Regular',
    fontSize: scaleFont(32),
  },
  sectionHeadingBold: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(32),
  },
  widgetItem: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(18),
  },
  widgetTitle: {
    color: COLORS.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(24),
  },
};

export { textStyle, textStyleObject, scaleFont };
