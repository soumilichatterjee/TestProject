import React, {useState} from 'react';
import {View, Text} from 'react-native';
import TaskForm from './TaskForm';

const NewTask = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async taskText => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://nordstone-third-tab-default-rtdb.firebaseio.com/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({text: taskText}),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = {id: generatedId, text: taskText};

      props.onAddTask(createdTask);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <View>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default NewTask;
