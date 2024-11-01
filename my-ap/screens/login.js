// auth.js
import { auth } from "../firebaseconfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

// Função de registro
export const register = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Usuário registrado com sucesso!");
  } catch (error) {
    console.error(error);
    alert("Erro ao registrar: " + error.message);
  }
};

// Função de login
export const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login bem-sucedido!");
      return true; // Retorna true ao logar com sucesso
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login: " + error.message);
      return false; // Retorna false se houver erro
    }
  };

// Função de logout
export const logout = async () => {
  try {
    await signOut(auth);
    alert("Logout realizado com sucesso!");
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer logout: " + error.message);
  }
};

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const success = await login(email, password);
        if (success) {
          navigation.navigate("main"); // Navega para a tela principal se o login for bem-sucedido
        } else {
          console.log("Falha no login, não navegando para a tela principal.");
        }
      };
 
    return (
        <View>
          <Text>Email</Text>
          <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
          <Text>Senha</Text>
          <TextInput placeholder="Senha" secureTextEntry onChangeText={setPassword} value={password} />
          <Button title="Login" onPress={handleLogin} />
          <Button title="Registrar" onPress={() => register(email, password)} />
        </View>
      );
    };
  
  export default LoginScreen;