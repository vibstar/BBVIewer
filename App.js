import { StatusBar } from 'expo-status-bar';
import React, { useState, onPress } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, TouchableOpacity, } from 'react-native';
import axios from 'axios';

export default function App() {
  const appURL = 'https://glacial-hamlet-05511.herokuapp.com';
  // const [posts,setPosts] = useState([]);
  const [bboards, setBBoards] = useState([]);
  // const getPosts = async () => {
  //   let result = {data:[]}
  //   result =
  //     await axios.post(
  //       currentValue.appURL+"/posts",
  //       {bboard:bboard}
  //     )
  //   setPosts(result.data)
  //   return result.data
  // }

  const getBBoards = async () => {
    axios.get(appURL + "/bboardNames").then((response) => {
      setBBoards(response.data.map((board) => ({ name: board })));
    });
    console.log(bboards)
  }

  // const Item = ({ name }) => (
  //   <View style={styles.BBScroller}>
  //     <Text style={styles.BBScrollerText}>{name}</Text>
  //   </View>
  // );

  // const renderItem = ({ item }) => (
  //   <Item bboards={item.name} />
  // );

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.topText}>BBViewer</Text>
      </View>
      <View style={({ flexDirection: 'row' })}>
        <Pressable style={styles.refreshButton} onPress={getBBoards}>
          <Text style={styles.refreshButtonText}>REFRESH BBOARDS</Text>
        </Pressable>
        <FlatList
          horizontal={true}
          data={bboards}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        >
          <TouchableOpacity
            style={styles.BBScroller}
            onPress={getBBoards}
          >
            <Text>{bboards.item.name}</Text>
          </TouchableOpacity>
        </FlatList>
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBox: {
    paddingTop: '10%',
    paddingBottom: '10%',
    width: '100%',
    height: '15%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    color: 'red',
    fontSize: 40,
  },
  refreshButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
  },
  refreshButtonText: {
    fontSize: 18,
    color: 'white'
  },
  BBScroller: {
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  BBScrollerText: {
    fontSize: 18,
    color: 'red',
  }
});
