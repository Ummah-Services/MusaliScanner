/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RNFetchBlob from 'rn-fetch-blob';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Picker} from '@react-native-community/picker';
import moment from "moment";


const App: () => React$Node = () => {


request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
  console.log(result);
});



  onSuccess = e => {
  	console.log(typeof e.data);
    vCardStr = e.data + "";
    splitString = vCardStr.split('\r\n');
    stringToBeWritten = '';
    for (var i = 0; i < splitString.length; i++) {
    		stringToBeWritten += splitString[i] + ",";
	}
	stringToBeWritten += '\r\n';
	
// RNFetchBlob.fs.dirs.DocumentDir +
    
    const pathToWrite = `musalis-` + selectedSalah + '-' + moment(new Date()).format("YYYY-MM-DD") + '-.csv';
        console.log('pathToWrite', pathToWrite);

RNFetchBlob.fs
      .appendFile(pathToWrite, stringToBeWritten, 'utf8')
      .then(() => {
        console.log(`wrote file ${pathToWrite}`);
      })
      .catch(error => console.error(error));
    
	console.log(stringToBeWritten.length);

 Alert.alert(
      "Musali QR Scanner",
      "Musali successfully registered. Would like to continue? ",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => 
        	{
        		setCount(count + 1);
        		console.log(count);
        		this.scanner.reactivate(); 
        	}
        }
      ],
      { cancelable: false }
    );

  };
  const [count, setCount] = useState(0);
  const [selectedSalah, setSelectedSalah] = useState("js");



  return (
  <View style={styles.container}>
    <View>


      <QRCodeScanner ref={(ref) => this.scanner = ref}
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
		bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>You have registered {count} musalis.</Text>
          </TouchableOpacity>
        }        
      />
      
    </View>
    
    <View>      
      <Picker
        selectedValue={selectedSalah}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedSalah(itemValue)}
      >
        <Picker.Item label="Fajr" value="fajr" />
        <Picker.Item label="Zuhr" value="zuhr" />
        <Picker.Item label="Asr" value="asr" />
        <Picker.Item label="Maghrib" value="maghrib" />                
        <Picker.Item label="Isha" value="isha" />                
        <Picker.Item label="Jumma" value="jumma" />                
      </Picker>
       
      
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
