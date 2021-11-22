import * as React from 'react';
import { Appbar, IconButton } from 'react-native-paper';

const Header = ({setUpdateList}) => {

  return (
    <Appbar.Header style={{ backgroundColor: '#236CA7' }}>
      <Appbar.Content title="My Ideas" />
      <IconButton
        icon="refresh"
        color='white'
        size={24}
        onPress={() => setUpdateList(true)}
      />
    </Appbar.Header>
  );
};

export default Header;