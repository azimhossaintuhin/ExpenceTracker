
import { StyleSheet, Text, View } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useRef , useCallback, Children, FC } from 'react'
import { BottomsheetProps } from '../types';




const Bottomsheet: FC<BottomsheetProps> = ({ sheetRef, changeHandler, children }) => {
  return (
    <BottomSheet ref={sheetRef} onChange={changeHandler}>
      <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
    </BottomSheet>
  );
};

export default Bottomsheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
})