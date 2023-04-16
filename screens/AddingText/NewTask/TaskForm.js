import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const TaskForm = props => {
  const taskInputRef = useRef();

  const submitHandler = () => {
    const enteredValue = taskInputRef.current._lastNativeText;
    if (!enteredValue) return;
    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
    taskInputRef.current.clear();
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        ref={taskInputRef}
        onChangeText={text => (taskInputRef.current._lastNativeText = text)}
        placeholder="Add your text here..."
      />
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={styles.buttonText}>
          {props.loading ? 'Sending...' : 'Add Task'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TaskForm;
