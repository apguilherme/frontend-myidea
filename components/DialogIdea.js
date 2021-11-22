import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Dialog, RadioButton, TextInput, ActivityIndicator } from 'react-native-paper';
import { BACKEND } from '../constants';

const DialogIdea = ({ id = null, setId = null, showModal, toggleModal, toggleSnackBar }) => {

    const [loading, setLoading] = React.useState(false);
    const [searching, setSearching] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('other');
    const [resources, setResources] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [priority, setPriority] = React.useState('low');

    const cleanModal = () => {
        setTitle('');
        setDescription('');
        setCategory('other');
        setResources('');
        setEmail('');
        setPriority('low');
        setId(null);
    }

    async function saveIdea() {
        setLoading(true);
        let url = `${BACKEND}/ideas`;
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "title": title,
                    "description": description,
                    "category": category,
                    "resources": resources,
                    "emails": email,
                    "priority": priority
                }
            )
        };
        await fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                cleanModal();
                toggleModal(false);
                toggleSnackBar({ state: true, msg: 'Ideia salva!' });
            })
            .catch(err => console.log(err));
        setLoading(false);
    }

    async function getIdeaById(id) {
        setSearching(true);
        setLoading(true);
        let url = `${BACKEND}/ideas/${id}`;
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                populateIdeaFound(data);
            })
            .catch(err => console.log(err));
        setLoading(false);
        setSearching(false);
    }

    async function updateIdea() {
        setLoading(true);
        let url = `${BACKEND}/ideas`;
        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "_id": id,
                    "title": title,
                    "description": description,
                    "category": category,
                    "resources": resources,
                    "emails": email,
                    "priority": priority
                }
            )
        };
        await fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                cleanModal();
                toggleModal(false);
                toggleSnackBar({ state: true, msg: 'Ideia atualizada!' });
            })
            .catch(err => console.log(err));
        setLoading(false);
    }

    const populateIdeaFound = (idea) => {
        setTitle(idea.title);
        setDescription(idea.description);
        setCategory(idea.category);
        setResources(idea.resources);
        setEmail(idea.emails);
        setPriority(idea.priority);
    }

    const cancel = () => {
        toggleModal(false);
        cleanModal();
    }

    React.useEffect(() => {
        console.log("ID", id)
        if (id) {
            getIdeaById(id);
        }
    }, [id])

    return (
        <>
            <Dialog style={styles.modal} visible={showModal} onDismiss={() => cancel()}>
                {
                    searching ?
                        <>
                            <Text>Carregando ideia...</Text>
                            <ActivityIndicator color='#236CA7' />
                        </>
                        :
                        <Dialog.ScrollArea>

                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                <Dialog.Title>{id ? 'Atualizar ideia' : 'Nova ideia'}</Dialog.Title>
                                <TextInput
                                    style={styles.field}
                                    label="Title"
                                    value={title}
                                    onChangeText={text => setTitle(text)}
                                />
                                <TextInput
                                    style={styles.field}
                                    label="Description"
                                    value={description}
                                    onChangeText={text => setDescription(text)}
                                />
                                <TextInput
                                    style={styles.field}
                                    label="Resources"
                                    value={resources}
                                    onChangeText={text => setResources(text)}
                                />
                                <TextInput
                                    style={styles.field}
                                    label="Email"
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                />
                                <Text>Category</Text>
                                <RadioButton.Group onValueChange={newValue => setCategory(newValue)} value={category}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', margin: 8, padding: 6 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text>Tech</Text>
                                            <RadioButton value="tech" />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text>Food</Text>
                                            <RadioButton value="food" />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text>Other</Text>
                                            <RadioButton value="other" />
                                        </View>
                                    </View>
                                </RadioButton.Group>
                                <Text>Priority</Text>
                                <RadioButton.Group onValueChange={newValue => setPriority(newValue)} value={priority}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', margin: 8, padding: 6 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text>Low</Text>
                                            <RadioButton value="low" />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text>Medium</Text>
                                            <RadioButton value="medium" />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text>High</Text>
                                            <RadioButton value="high" />
                                        </View>
                                    </View>
                                </RadioButton.Group>


                            </ScrollView>

                        </Dialog.ScrollArea>
                }
                <Dialog.Actions>
                    {
                        !loading
                            ? <>
                                <Button color='#236CA7' onPress={() => cancel()}>Cancel</Button>
                                <Button color='#236CA7' mode='contained' onPress={() => id ? updateIdea() : saveIdea()}>{id ? 'Atualizar' : 'Salvar'}</Button>
                            </>
                            : <ActivityIndicator color='#236CA7' />
                    }
                </Dialog.Actions>
            </Dialog>
        </>
    )
};

const styles = StyleSheet.create({
    modal: {
        padding: 8
    },
    field: {
        margin: 4
    }
})

export default DialogIdea;