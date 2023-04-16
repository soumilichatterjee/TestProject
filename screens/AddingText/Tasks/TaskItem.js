import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TaskItem = props => {
  return (
    <View style={styles.task}>
      <Text>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
  },
});

export default TaskItem;
