import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TaskItem from './TaskItem';

const Tasks = (props) => {
  let taskList = <Text style={styles.text}>No tasks found. Start adding some!</Text>;

  if (props.items.length > 0) {
    taskList = (
      <View style={styles.list}>
        {props.items.map((task) => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </View>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <Button title="Try again" onPress={props.onFetch} />;
  }

  if (props.loading) {
    content = <Text style={styles.text}>Loading tasks...</Text>;
  }

  return (
    <View style={styles.section}>
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#f8f8f8',
  },
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  list: {
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    color: '#888',
  },
});

export default Tasks;