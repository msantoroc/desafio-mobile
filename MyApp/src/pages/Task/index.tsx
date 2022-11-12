import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { PageContainer } from '../../components/PageContainer';
import { Text } from '../../components/Text';
import { useApi } from '../../hooks/useApi';
import { Input, StyledButton } from './styles';
import Toast from 'react-native-toast-message';

const Task = () => {
  const navigation = useNavigation();
  const { addTask, editTask } = useApi();
  const { params } = useRoute<any>();
  const { title, description, id, done } = params || {};
  const [newTitle, setNewTitle] = useState(title || '');
  const [newDescription, setNewDescription] = useState(description || '');

  const handleCreateTask = async () => {
    try {
      await addTask(newTitle, newDescription);
      Toast.show({
        type: 'success',
        text1: 'Task criada com sucesso',
      });
      navigation.goBack();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao criar a task',
        text2: err.message,
      });
    }
  };

  const handleEditTask = async () => {
    try {
      await editTask({
        title: newTitle,
        description: newDescription,
        id,
        done,
      });
      Toast.show({
        type: 'success',
        text1: 'Task editada com sucesso',
      });
      navigation.goBack();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Falha ao editar a task',
        text2: err.message,
      });
    }
  };

  const handleSubmitTask = params ? handleEditTask : handleCreateTask;

  return (
    <PageContainer
      taskPage
      pageTitle={params ? 'Editar tarefa' : 'Nova Tarefa'}
      pageSubtitle={
        params
          ? 'Preencha os campos abaixo para editar a sua tarefa'
          : 'Preencha os campos abaixo para adicionar uma nova tarefa'
      }>
      <Input
        placeholder="Título"
        value={newTitle || title}
        onChangeText={setNewTitle}
      />
      <Input
        placeholder="Descrição"
        value={newDescription || description}
        onChangeText={setNewDescription}
      />
      <StyledButton onPress={handleSubmitTask}>
        <Text color="white" weight="bold">
          Add task
        </Text>
      </StyledButton>
    </PageContainer>
  );
};

export { Task };
