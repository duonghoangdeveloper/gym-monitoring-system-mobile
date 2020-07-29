import LottieView from 'lottie-react-native';
import * as React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  // ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { loadingRef } from '../assets/animations';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { CommonScrollViewAwareScreenHeight } from './common-scroll-view-aware-screen-height';

type BackTitleTypes = {
  haveBack: boolean,
  title: string,
  haveRight?: boolean,
  rightIcon?: string,
  onRightPress?: () => void,
  leftIcon?: string,
  backType?: 'back' | 'exit',
  onBackPress: () => void,
  rightComponent: () => React.ReactNode,
  leftComponent: () => React.ReactNode,
};

type PropTypes = {
  style: StyleProp<ViewStyle>,
  containerStyle: StyleProp<ViewStyle>,
  children: React.Node,
  scrollable: ?boolean,
  loading: boolean,
  requestError?: {},
  isErrorImportant?: boolean,
  onErrorPress?: () => void,
  dismissLoading?: boolean,
  exposeTime?: number,
  handleBack?: boolean,
  backAction?: () => void,
  showBackPopup?: boolean,
  haveBackHeader?: boolean,
  barStyle?: 'dark-content' | 'light-content',
  safeArea?: boolean,
  refreshing?: boolean,
  onRefresh?: () => void,
  refreshable?: boolean,
} & BackTitleTypes;

const SafeAreaViewFlex = ({ children, safe, style }) => {
  if (safe) {
    return <SafeAreaView style={style}>{children}</SafeAreaView>;
  }
  return <View style={style}>{children}</View>;
};

const Container = ({
  children,
  onRefresh,
  refreshable,
  refreshing,
  scrollable,
  style,
}) => {
  if (scrollable) {
    return (
      <CommonScrollViewAwareScreenHeight
        containerStyle={[styles.contentContainerStyle, style]}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          refreshable ? (
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      >
        {children}
      </CommonScrollViewAwareScreenHeight>
    );
  }
  return (
    <View style={[styles.contentContainerStyle, { flex: 1 }, style]}>
      {children}
    </View>
  );
};

// eslint-disable-next-line react/display-name
export const CommonViewContainer = ({
  // backType = 'back',
  children,
  containerStyle,
  // haveBack = true,
  // haveBackHeader = false,
  // haveRight,
  leftComponent,
  leftIcon,
  loading = false,
  onBackPress,
  onRefresh,
  onRightPress,
  refreshable,
  refreshing,
  rightComponent,
  rightIcon,
  safeArea = true,
  scrollable,
  style,
  title,
  ...next
}: PropTypes) => {
  const renderLoading = () =>
    loading && (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          bottom: 0,
          flex: 1,
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <LottieView
          autoPlay
          source={loadingRef}
          style={{
            height: 100,
            width: 100,
          }}
        />
      </View>
    );

  // </FadedContainer>

  // const renderBackTitle = () =>
  //   haveBackHeader && (
  //     <CommonHeader
  //       backType={backType}
  //       haveBack={haveBack}
  //       haveRight={haveRight}
  //       leftComponent={leftComponent}
  //       leftIcon={leftIcon}
  //       onBackPress={onBackPress}
  //       onRightPress={onRightPress}
  //       rightComponent={rightComponent}
  //       rightIcon={rightIcon}
  //       title={title}
  //       type={backType}
  //     />
  //   );

  return (
    <SafeAreaViewFlex
      safe={safeArea}
      style={[styles.containerStyle, containerStyle]}
    >
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      {/* {renderBackTitle()} */}
      <Container
        onRefresh={onRefresh}
        refreshable={refreshable}
        refreshing={refreshing}
        scrollable={scrollable}
        style={style}
      >
        {children}
      </Container>
      {renderLoading()}
    </SafeAreaViewFlex>
  );
};

const styles = StyleSheet.create({
  absoluteStyle: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  containerStyle: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: DIMENSIONS.DISTANCE_4,
  },
});
