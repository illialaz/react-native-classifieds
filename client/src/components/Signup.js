import React, { useState } from "react"

import { Colors } from "react-native/Libraries/NewAppScreen"

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native"

export const Signup = (props) => {
  const [email, setEmail] = useState("your@email.com")
  const [password, setPassword] = useState("ssseeeecrreeet")
  const [name, setName] = useState("Illia")

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Signup</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            defaultValue="your@email.com"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            defaultValue="ssseeeecrreeet"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={(name) => setName(name)}
            defaultValue="Illia"
          />
        </View>
        <View style={styles.sectionContainer}>
          <Button
            title="Login"
            onPress={() => props.doSignup(email, password, name)}
          ></Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingRight: 12,
    paddingLeft: 12,
    marginTop: 12,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemWrapper: {
    borderColor: "gray",
    borderBottomWidth: 1,
  },
})
