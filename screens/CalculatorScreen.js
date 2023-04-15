import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";

function CalculatorScreen({ navigation }) {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("addition");
  const [result, setResult] = useState("");

  const firstNumHandler = (value) => {
    setNum1(Number(value));
  };

  const secondNumHandler = (value) => {
    setNum2(Number(value));
  };

  const handleSubmit = async () => {
    const apiUrl =
      "https://rainbow-liger-ba6aa0.netlify.app/.netlify/functions/api/calculate";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num1, num2, operation }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log(error);
    }
    setNum1("");
    setNum2("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.control}>
        <Text style={styles.label}>Num1:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter first number"
          value={String(num1)}
          onChangeText={firstNumHandler}
        />
      </View>

      <View style={styles.test}>
        <Text style={styles.label}>Select Operation:</Text>
        <View style={styles.picker}>
          <TouchableOpacity
            style={
              operation === "addition" ? styles.activeOption : styles.option
            }
            onPress={() => setOperation("addition")}
          >
            <Text
              style={
                operation === "addition"
                  ? styles.activeOptionText
                  : styles.optionText
              }
            >
              Addition +
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              operation === "subtraction" ? styles.activeOption : styles.option
            }
            onPress={() => setOperation("subtraction")}
          >
            <Text
              style={
                operation === "subtraction"
                  ? styles.activeOptionText
                  : styles.optionText
              }
            >
              Subtraction -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              operation === "multiplication"
                ? styles.activeOption
                : styles.option
            }
            onPress={() => setOperation("multiplication")}
          >
            <Text
              style={
                operation === "multiplication"
                  ? styles.activeOptionText
                  : styles.optionText
              }
            >
              Multiplication *
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.control}>
        <Text style={styles.label}>Num2:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter second number"
          value={String(num2)}
          onChangeText={secondNumHandler}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result !== "" && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Result: {result}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#464646",
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#323f92",
    backgroundColor: "#fff",
    color: "#333",
    marginLeft: 10,
  },
  picker: {
    flexDirection: "row",
    flexWrap: "wrap", 
    marginTop: 10
  },
  option: {
    padding: 7,
    borderRadius: 6,
    backgroundColor: "#34a3fd",
    margin: 3,
    color: "white",
  },
  activeOption: {
    padding: 7,
    borderRadius: 6,
    backgroundColor: "#0077d8",
    margin: 3,
    color: "white",
  },
  optionText: {
    fontSize: 15,
    color: "white",
  },
  activeOptionText: {
    fontSize: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#2196f3",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Helvetica Neue",
  },
  result: {
    marginTop: 30,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#323f92",
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    color: "#333",
  },
  test: {
    width: "100%",
    marginBottom: 30,
  },
});

export default CalculatorScreen;