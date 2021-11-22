import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const Ideas = () => {

    return (
        <>
            <Text style={styles.head}>About</Text>
        </>
    )
};

const styles = StyleSheet.create({
    head: {
        alignContent: 'center',
        alignItems: 'center',
    }
})

export default Ideas;