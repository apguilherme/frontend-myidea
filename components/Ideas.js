import * as React from 'react';
import { FlatList, View, RefreshControl, StyleSheet } from 'react-native';
import { FAB, List, ActivityIndicator, Text, IconButton, Snackbar } from 'react-native-paper';
import { BACKEND } from '../constants';

import DialogIdea from './DialogIdea';

const Ideas = ({ updateList, setUpdateList }) => {

  const [loading, setLoading] = React.useState(false);
  const [snack, setSnack] = React.useState({ state: false, msg: '' });
  const [refreshing, setRefreshing] = React.useState(false);
  const [ideas, setIdeas] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const toggleSnackBar = (value) => setSnack(value);
  const toggleModal = (value) => setShowModal(value);

  React.useEffect(() => {
    getIdeas();
  }, []);

  React.useEffect(() => {
    if (updateList) {
      getIdeas();
      setUpdateList(false);
    }
  }, [updateList]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await getIdeas();
    } catch (err) {
      console.log(err);
    }
    setRefreshing(false);
  }, [refreshing]);

  async function getIdeas() {
    setLoading(true);
    let url = `${BACKEND}/ideas`;
    await fetch(url)
      .then(res => res.json())
      .then(data => setIdeas(data))
      .catch(err => console.log(err));
    setLoading(false);
  }

  async function deleteIdea(id) {
    setLoading(true);
    let url = `${BACKEND}/ideas/${id}`;
    let requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    await fetch(url, requestOptions)
      .then(res => res.json())
      .then(data => {
        toggleSnackBar({ state: true, msg: 'Ideia removida!' });
        setId(null);
        getIdeas();
      })
      .catch(err => console.log(err));
    setLoading(false);
  }

  const editIdea = (id) => {
    setId(id);
    setShowModal(true);
  }

  return (
    <>

      {loading && <ActivityIndicator color='#236CA7' />}

      {
        !loading && ideas.length === 0 && <View><Text>Nenhuma ideia registrada.</Text></View>
      }

      <FlatList
        data={ideas}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.description}
            left={
              () => <IconButton icon="delete" color={'#bd2f2f'} size={20} onPress={() => deleteIdea(item._id)} />
            }
            right={
              () => <IconButton icon="pencil" color={'#26456E'} size={20} onPress={() => editIdea(item._id)} />
            }
          />
        )}
      />

      {
        snack && !showModal && <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          onPress={() => toggleModal(true)}
        />
      }

      {
        showModal && <DialogIdea id={id} setId={setId} showModal={showModal} toggleModal={toggleModal} toggleSnackBar={toggleSnackBar} />
      }

      <Snackbar
        visible={snack.state}
        onDismiss={() => toggleSnackBar({ state: false, msg: '' })}
        duration={10000}
        action={{
          label: 'X',
          onPress: () => { toggleSnackBar({ state: false, msg: '' }) },
        }}>
        {snack.msg}
      </Snackbar>

    </>
  )
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 10,
    right: 15,
    bottom: 50,
    backgroundColor: '#236CA7',
  }
})

export default Ideas;