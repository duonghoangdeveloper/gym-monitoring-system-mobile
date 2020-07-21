/* eslint-disable no-shadow */
import { StyleSheet } from 'react-native';

import colors from './colors';
import { dimension } from './dimensions';

function scaleFont(fontSize) {
  const scaleFont = Math.round((fontSize * dimension.SCREEN_WIDTH) / 375);
  if (scaleFont <= 12) return fontSize;
  return scaleFont;
}

const textStyle = StyleSheet.create({
  biggestTitle: {
    color: colors.dark20,

    // fontSize: scaleFont(42),
    fontFamily: 'Quicksand-Regular',
    fontSize: scaleFont(42),
  },
  biggestTitleBold: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(42),
  },
  bodyBigText: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(16),
  },
  bodyBigTextBold: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(16),
  },
  bodyText: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(14),
  },
  bodyTextBold: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(14),
  },
  label: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(12),
  },
  labelRegular: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(12),
  },
  sectionHeading: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Regular',
    fontSize: scaleFont(32),
  },
  sectionHeadingBold: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(32),
  },
  widgetItem: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(18),
  },
  widgetTitle: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(24),
  },
});

const textStyleObject = {
  biggestTitle: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Regular',
    fontSize: scaleFont(42),
  },
  biggestTitleBold: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(42),
  },
  bodyBigText: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(16),
  },
  bodyBigTextBold: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(16),
  },
  bodyText: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(14),
  },
  bodyTextBold: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(14),
  },
  label: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: scaleFont(12),
  },
  labelRegular: {
    color: colors.dark20,
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: scaleFont(12),
  },
  sectionHeading: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Regular',
    fontSize: scaleFont(32),
  },
  sectionHeadingBold: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(32),
  },
  widgetItem: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(18),
  },
  widgetTitle: {
    color: colors.dark20,
    fontFamily: 'Quicksand-Bold',
    fontSize: scaleFont(24),
  },
};

export { textStyle, textStyleObject, scaleFont };
