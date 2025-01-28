import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FC } from 'react';
import { BottomsheetProps } from '../types';

const Bottomsheet: FC<BottomsheetProps> = ({ sheetRef, children }) => {
  return (
    <BottomSheet 
      ref={sheetRef} 
      index={-1}
      snapPoints={["32%"]} 
      enablePanDownToClose={true}
      enableContentPanningGesture={false} 
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Bottomsheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 10,
  },
});
