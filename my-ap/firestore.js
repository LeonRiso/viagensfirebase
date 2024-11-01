// firestore.js
import { db } from "./firebaseconfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Criar documento
export const createData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Documento adicionado com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar documento: ", error);
  }
};

// Ler documentos
export const readData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error("Erro ao ler documentos: ", error);
  }
};

// Atualizar documento
export const updateData = async (collectionName, docId, newData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, newData);
    console.log("Documento atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar documento: ", error);
  }
};

// Deletar documento
export const deleteData = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Documento deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar documento: ", error);
  }
};
