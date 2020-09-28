import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"

import { Login } from "./components/Login"
import { List } from "./components/List"
import { Detail } from './components/Detail'
import { New } from './components/New'
import { Signup } from './components/Signup'

export const App = () => {
  const [token, setToken] = useState("")
  const [items, setItems] = useState([])
  const [view, setView] = useState("main") //views: main, new, detail, login, signup
  const [item, setItem] = useState({})

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@jwt", value)
    } catch (e) {
      Alert.alert("Error while storing data!")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const _token = await AsyncStorage.getItem("@jwt")
      setToken(_token)
      if (_token !== null) {
        fetch("http://localhost:3010/items", {
          method: "GET",
          headers: {
            authorization: `Bearer ${_token}`,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.success) {
              json.items.map((item) => (item.key = item.id + ""))
              setItems(json.items)
            } else {
              setToken(null)
            }
          })
          .catch((error) => {
            setToken(null)
          })
      }
    } catch (e) {
      // error reading value
    }
  }

  const addItem = (title, price, description) => {
    fetch("http://localhost:3010/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        description,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setItems(json.items)
          setView("list")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const doSignup = (email, password, name) => {
    fetch("http://localhost:3010/sinup)", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name
      }),
    })
      .then(response => response.json())
      .then(json => {
        if(json.success) {
          setView("login")
        }
      }).catch(err => console.log(err))
  }

  const doLogin = (email, password) => {
    fetch("http://localhost:3010/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          // Alert.alert(json.token)
          setToken(json.token)
          storeData(json.token)
          setView("main")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <SafeAreaView>
        {view === "new" ? (
          <New addItem={addItem} setView={setView} />
        ) : view === "detail" ? (
          <Detail item={item} setView={setView} />
        ) : view === "signup" ? (
          <Signup doSignup={doSignup} />
        ) : view === "main" ? (
          <List items={items} setView={setView} setItem={setItem} />
        ) : (
          <Login doLogin={doLogin} />
        )}
      </SafeAreaView>
    </>
  )
}
