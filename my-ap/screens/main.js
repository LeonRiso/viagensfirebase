// MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import DatePicker from 'react-datepicker'; // Importe o DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Importa os estilos do DatePicker
import { db } from '../firebaseconfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const MainScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const entriesCollection = collection(db, 'entries');
      const entriesSnapshot = await getDocs(entriesCollection);
      const entriesList = entriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(entriesList);
    };

    fetchEntries();
  }, []);

  const handleAddEntry = async () => {
    if (title && description) {
      const newEntry = {
        title,
        description,
        date: date.getTime(), // Armazena como timestamp
        location,
        photo
      };

      try {
        const docRef = await addDoc(collection(db, 'entries'), newEntry);
        setEntries([...entries, { id: docRef.id, ...newEntry }]);
        setTitle("");
        setDescription("");
        setDate(new Date());
        setLocation("");
        setPhoto("");
      } catch (error) {
        alert("Erro ao salvar entrada: " + error.message);
      }
    } else {
      alert("Por favor, preencha o título e a descrição.");
    }
  };

  const renderEntry = ({ item }) => (
    <View style={styles.entryContainer}>
      {item.photo ? <Image source={{ uri: item.photo }} style={styles.image} /> : null}
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Data: {new Date(item.date).toLocaleDateString()}</Text>
      <Button title="Ver Detalhes" onPress={() => alert(`Detalhes da entrada: ${item.description}`)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Entrada de Viagem</Text>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Descrição" value={description} onChangeText={setDescription} style={styles.input} />
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <TextInput placeholder="Localização" value={location} onChangeText={setLocation} style={styles.input} />
      <TextInput placeholder="URL da Foto (opcional)" value={photo} onChangeText={setPhoto} style={styles.input} />
      <Button title="Adicionar Entrada" onPress={handleAddEntry} />

      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
  entryContainer: {
    marginBottom: 15,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  entryTitle: {
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default MainScreen;
