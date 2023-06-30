import React from 'react';
import {useSelector} from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import {Tile} from 'react-native-elements';
import { Card } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import * as Sharing from 'expo-sharing';
import { baseUrl } from '../shared/baseUrl';
import PlaybackComponent from '../components/PlaybackComponent';

const PlaybackScreen = () => {
  const recordings = useSelector((state) => state.recordings);

  console.log(recordings)
  if (recordings.isLoading) {
      return <Loading />;
  }
  if (recordings.errMess) {
      return (
          <View>
              <Text>{recordings.errMess}</Text>
          </View>
      );
  }

    // function getRecordingLines() {
    //   return recordings.map((recordingLine, index) => {
    //     return (
    //       <View key={index} style={styles.row}>
    //         <Card>
    //           <Text style={styles.fill}>
    //             Recording {index + 1} - {recordingLine.duration}
    //           </Text>
    //           <Card.Divider />
    //           <Button 
    //             style={styles.button} 
    //             onPress={() => recordingLine.sound.replayAsync()}
    //             title='Play'
    //           />
    //           <Button 
    //             style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"
    //           />
    //         </Card>
    //       </View> 
    //     )
    //   })
    // }



    const renderRecording = ({ item: recording }) => {
      
      return (
          <View style={styles.column}>
              <Tile 
                title={recording.name}
                imgSrc={{uri:baseUrl + recording.image}}
              />
              {/* <Card.Divider /> */}
              <PlaybackComponent />
              <Button 
                style={styles.button} onPress={() => Sharing.shareAsync(recording.file)} title="Share"
              />
          </View>
      );
  };
    return (
      // <View style={styles.container}>
      //   {getRecordingLines()}
      //   <StatusBar style="auto" />
      // </View>
      <FlatList
      data={recordings.recordingsArray}
      renderItem={renderRecording}
      keyExtractor={(item) => item.id.toString()}
    >
      </FlatList>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fill: {
      flex: 1,
      margin: 1
    },
    button: {
      margin:1,
      width: 10
    }
  });
  

  export default PlaybackScreen;