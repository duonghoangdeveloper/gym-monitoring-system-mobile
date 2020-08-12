import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { CommonIcon } from './common-icon';
import { CommonInputForm } from './common-input-form';

type PropTypes = {
  items: Array,
};

export const CommonSearchBar = ({ items }: PropTypes) => {
  const [search, setSearch] = useState('');

  const filterList = list =>
    list.filter(
      items =>
        items.artist.toLowerCase().includes(search.toLowerCase()) ||
        items.song.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <View style={styles.searchInputContainer}>
      <CommonInputForm
        onChangeText={search => setSearch({ search })}
        style={styles.searchBar}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchBar: {
    width: scaleV(500),
  },
});
