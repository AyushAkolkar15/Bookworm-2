import React, { useEffect } from "react";
import { app } from "./base";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const appIcon = require("../assets/logo.png");

const db = app.firestore();

function App() {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers] = React.useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    if (!username || !fileUrl) {
      return;
    }
    await db.collection("users").doc(username).set({
      name: username,
      pdf: fileUrl,
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection("users").get();
      setUsers(
        usersCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchUsers();
  }, []);

  return (
    
    <>
    <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea}/>

        <Text style={styles.appTitleTextContainer}>BookWorm</Text>
        <Image source={appIcon} style={styles.appIcon}/>
        
        
      <form onSubmit={onSubmit} style={styles.container2}>
        <input type="file" onChange={onFileChange} style={styles.filetype} />
        <input type="text" name="username" placeholder="NAME" style={styles.inputtype} />
        <button>Submit</button>
      </form>
      
      <ul>
        {users.map((user) => {
          return (
            <li key={user.name}>
              <img width="100" height="100" src={user.pdf} alt={user.name} />
              <p>{user.name}</p>
            </li>
          );
        })}
      </ul>
      </View>
    </>
  );
}


const styles = StyleSheet.create ({
    appTitleTextContainer: {
    color: "#15193c",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    fontColor:"#15193c",
    marginBottom: RFValue(0),
    marginLeft: RFValue(40),
    backgroundColor: "#E3E4FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#E3E4FA",
   // alignItems: "center",
    //justifyContent: "center"
  },
    appIcon: {
    width: RFValue(45),
    height: RFValue(405),
    resizeMode: "contain",
    marginBottom: RFValue(100),
    marginTop: RFValue(-224),
    marginLeft: RFValue(15)
  },
  filetype: {
    marginBottom: RFValue(24),
    flex: 1,
    backgroundColor: "#E3E4FA",
   // alignItems: "center",
    //justifyContent: "center"
  },
  inputtype: {
    marginTop: RFValue(),
    flex: 1,
    backgroundColor: "#E3E4FA",
   // alignItems: "center",
    //justifyContent: "center"
  },
   container2: {
    flex: 1,
    backgroundColor: "#E3E4FA",
   // alignItems: "center",
    //justifyContent: "center"
  },
})

export default App;
