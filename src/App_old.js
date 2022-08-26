import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { StatusBar, Dimensions } from 'react-native';
import Input from './components/Input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import Button from './components/Button';


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  align-self: center;
  margin: 20px;
  background-color: ${({ theme }) => theme.itemBackground};
  width: ${({ width }) => width - 40}px;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;


export default function App() {
  const width = Dimensions.get('window').width;
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState(''); 
  const [tasks, setTasks] = useState({});


  //로걸저장소에 데이터 저장하기
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setTasks(value);
    } catch (e) {
      // saving error
    }
  };

  //로걸저장소에서 데이터 가져오기
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
       const tasks = jsonValue != null ? JSON.parse(jsonValue) : {};
       setTasks(tasks);
    } catch (e) {
      // error reading value
    }
  };

  //로컬저장소 삭제
  const removeValue = async(key)=>{
    try{
      await AsyncStorage.removeItem(key);
    }catch (e){
      //error reading
    }
  }

  //전체삭제
  const clearAll=async()=>{
    try{
      await AsyncStorage.clear();
    }catch (e){
      //error reading
    }
  }


  //추가
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, checked: false },
    };
    // setTasks({...tasks, ...newTaskObject}); //객체병합, 스프레드 문법
    storeData('tasks', { ...tasks, ...newTaskObject }); //로컬저장소에 저장
    setNewTask();
  };

  //삭제
  const _deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks); //객체복사
    delete currentTasks[id];
    // setTasks(currentTasks);
    storeData('tasks', currentTasks); //로컬저장소에 저장
  };

  
  //완료
  const _toggleTask = (id) => {
    const currentTasks = { ...tasks }; //객체복사
    currentTasks[id]['checked'] = !currentTasks[id]['checked'];
    // setTasks(currentTasks);
    storeData('tasks', currentTasks); //로컬저장소에 저장
  };

  //수정
  const _updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    // setTasks(currentTasks);
    storeData('tasks', currentTasks); //로컬저장소에 저장
  };

  // 포커스
  const _onBlur = () => {
    setNewTask('');
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  return !isReady ? (
    <AppLoading
      // 앱로딩전 실행할 로직
      startAsync={()=>{getData('tasks')}}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title width={width}>Bucket List</Title>
        <Input
          placeholder="+버킷 추가하기"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map((item) => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
        {/* <Button/> */}
      </Container>
    </ThemeProvider>
  );
}
