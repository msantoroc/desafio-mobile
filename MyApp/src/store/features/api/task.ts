import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../../../models';
import { BACKEND_API } from '@env';

interface TasksResponse {
  tasks: Task[];
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_API }),
  tagTypes: ['Task'],
  endpoints: builder => ({
    tasks: builder.query<TasksResponse, Object>({
      query: () => 'tasks',
      transformResponse: (resp: TasksResponse) => {
        const { tasks } = resp;
        return {
          tasks: tasks.sort(
            (taskA: Task, taskB: Task) =>
              Number(taskA.done) - Number(taskB.done),
          ),
        };
      },
      providesTags: ['Task'],
    }),

    addTask: builder.mutation({
      query: task => ({
        url: '/task/create',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation({
      query: task => ({
        url: '/task/update',
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),

    deleteTask: builder.mutation({
      query: task => ({
        url: '/task/delete',
        method: 'DELETE',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
