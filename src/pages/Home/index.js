import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userLogged } from '../../services/user';
import { useAuth } from '../../context/AuthContext';
import {format} from "date-fns";


// componentes criados
import Navbar from '../../components/navbar';
import CardRecent from '../../components/cardRecents';
import CardList from '../../components/cardList';
import { getAllTarefas } from '../../services/tarefas';


function getDate(){
  const currentDate = new Date();
  const formatDate = format(currentDate, 'dd/MM/yyyy');
  return formatDate;
}

export default function Home() {

  const [user, setUser] = useState({});
  const [tarefas, setTarefas] = useState({});
  const navigate = useNavigation();
  const {token} = useAuth();
  const date = getDate();


  function validateToken() {
    if (!token) navigate.navigate("Signin");
  }
  

  async function getUserLogged() {
    try {
        const userResponse = await userLogged(token);
        setUser(userResponse.data);
    } catch (error) {
        console.log("Erro ao obter usuário logado:", error);
        throw error; // Lança o erro novamente para tratamento na camada superior
    }
  }

  async function getAllTasks(){
    try{
      const tarefaResponse = await getAllTarefas(token);
      setTarefas(tarefaResponse.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    validateToken();
    getUserLogged();
    getAllTasks();
  }, []);

  
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.welcome}>Bem vindo, {user.name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Text style={styles.title}>Recentes</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {tarefas.length ? (
          <View style={styles.boxRecents}>
            {tarefas.slice(0, 5).map((tarefa, index) => (
              <CardRecent key={index} priority={tarefa.prioridade} date={format(new Date(tarefa.dataTarefa), 'dd/MM/yyyy')} text={tarefa.titulo} />
            ))}
          
          </View>
          ):(
          <Text>Sem tarefa recente</Text>
        )}
        
        
          
      </ScrollView>


      <Text style={styles.title}>To Do</Text>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {tarefas.length ? (
          <View style={styles.boxTasks}>
            {tarefas.map((tarefa, index) => (
              <CardList key={index} priority={tarefa.prioridade} date={format(new Date(tarefa.dataTarefa), 'dd/MM/yyyy')} text={tarefa.titulo} />
            ))}
          
          </View>
          ):(
            <Text>Sem tarefa recente</Text>
          )
        }
      </ScrollView>


      <View style={styles.boxNavbar}>
        <Navbar/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
  },
  header:{
    height: "15%",
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 50,
    borderBottomColor: "#53D4FF",
    borderBottomWidth: 2,
    backgroundColor: "white",
  },
  welcome:{
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  date: {
    fontSize: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  boxRecents: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: 180,
    width: "90%",
  },
  boxTasks: {
    height: "auto",
    width: "100%",
    alignItems: 'center',
  },
  boxNavbar: {
    paddingVertical: 20,
    height: "12%",
  },
  title:{
    width: "100%",
    paddingLeft: 20,
    fontSize: 30,
    color:"#000",
    fontWeight: 'bold',
    marginVertical: 20,

  },
});
