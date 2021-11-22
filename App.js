import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import BottomNav from './components/BottomNav';
import Header from './components/Header';

export default function App() {
  
  const [updateList, setUpdateList] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header updateList={updateList} setUpdateList={setUpdateList} />
      <BottomNav updateList={updateList} setUpdateList={setUpdateList} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '100%',
  },
});
