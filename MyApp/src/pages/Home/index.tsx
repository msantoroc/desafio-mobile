import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PageContainer } from '../../components/PageContainer';
import { Divider, StyledButton } from './styles';
import { ParamList } from '../../navigation';
import { useTasksQuery } from '../../store/features/api/task';
import { TaskListItem } from '../../components/TaskListItem';
import Plus from '../../assets/imgs/plus.svg';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<ParamList>>();
  const { data, isLoading, refetch } = useTasksQuery('Task');

  return (
    <PageContainer
      pageTitle="Lista de tarefas"
      pageSubtitle="Aqui está a sua lista de tarefas!">
      <>
        <FlatList
          data={data ? data.tasks : []}
          renderItem={({ item }) => <TaskListItem item={item} />}
          keyExtractor={task => String(task.id)}
          refreshing={isLoading}
          onRefresh={refetch}
          ItemSeparatorComponent={() => <Divider />}
        />
        <StyledButton
          onPress={() => navigation.navigate('Task')}
          testID="add-button">
          <Plus width={35} height={35} fill="white" />
        </StyledButton>
      </>
    </PageContainer>
  );
};

export { Home };
