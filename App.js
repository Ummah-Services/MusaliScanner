/**
 * Musalis Scanner - Ummah Services
 * https://github.com/Ummah-Services/MusaliScanner
 *
 * @format
 * @flow strict-local
 */

import React , { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RNFetchBlob from 'rn-fetch-blob';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Picker, PickerIOS} from '@react-native-community/picker';
import moment from "moment";
import QRCode from 'react-native-qrcode-svg';
import DropDownPicker from 'react-native-dropdown-picker';

const App: () => React$Node = () => {

  const [count, setCount] = useState(0);
  const [selectedSalah, setSelectedSalah] = useState("fajr");
  const [fileNameWithPath, setFileNameWithPath] = useState(RNFetchBlob.fs.dirs.DownloadDir + `/musalis-` + selectedSalah + '-' + moment(new Date()).format("DD-MMM-YYYY") + '-.csv');


  const onPressStartAgain = () => {
  	 this.scanner.reactivate();
	};


 const onSalahChange = selectedValue => {
 	console.log(selectedValue);
 	setSelectedSalah(selectedValue);
 	setCount(0);
 	setFileNameWithPath(RNFetchBlob.fs.dirs.DownloadDir + `/musalis-` + selectedValue + '-' + moment(new Date()).format("DD-MMM-YYYY") + '-.csv');
 }

  onSuccess = e => {
     console.log(encodeURI(e.data));
      if (Platform.OS == 'android') {
          request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
              console.log("Result of Write Access :" + result);
          });

      } else {
          console.log("No request for Stroage access on " + Platform.OS);
      }

    vCardStr = e.data + "";
    splitString = vCardStr.split('\n');
    stringToBeWritten =  moment(new Date()).format("DD-MMM-YYYY") + ",";
    for (var i = 0; i < splitString.length; i++) {
            currentPart = splitString[i];
            currentPart = currentPart.replace('\r','');
            currentPart = "\"" + currentPart + "\"";
    		stringToBeWritten += currentPart + ",";

	}
	stringToBeWritten += '\r\n';

    const pathToWrite = RNFetchBlob.fs.dirs.DownloadDir + `/musalis-` + selectedSalah + '-' + moment(new Date()).format("DD-MMM-YYYY") + '-.csv';
        console.log('pathToWrite', pathToWrite);

	RNFetchBlob.fs
      .appendFile(pathToWrite, stringToBeWritten, 'utf8')
      .then(() => {
        console.log(`wrote file ${pathToWrite}`);
      })
      .catch(error => console.error(error));
      setCount(count + 1);

	Alert.alert(
      "Musali QR Scanner",
        (count+1)  + " musalis successfully registered for " + selectedSalah + ". Would like to continue? ",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () =>
        	{
        		console.log(count);
        		this.scanner.reactivate();
        	}
        }
      ],
      { cancelable: false }
    );

 }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Musali Scanner</Text>
            </View>
            <View style={styles.sectionContainer}>
		          <Text style={styles.centerText}>
        				Pick salah:
		          </Text>

{/*                <DropDownPicker*/}
{/*                    items={[*/}
{/*                        {label: 'Fajr', value: 'Fajr'},*/}
{/*                        {label: 'Zuhr', value: 'Zuhr'},*/}
{/*                        {label: 'Asr', value: 'Asr'},*/}
{/*                        {label: 'Maghrib', value: 'Maghrib'},*/}
{/*                        {label: 'Isha', value: 'Isha'},*/}
{/*                        {label: 'Jumma', value: 'Jumma'},*/}
{/*                    ]}*/}
{/*//                    defaultValue={selectedSalah}*/}
{/*                    containerStyle={{height: 40}}*/}
{/*                    style={{backgroundColor: '#fafafa'}}*/}
{/*                    dropDownStyle={{backgroundColor: '#fafafa'}}*/}
{/*                    onChangeItem={item =>*/}
{/*                        onSalahChange(item)*/}
{/*                    }*/}
{/*                />*/}


		        <Picker
        		selectedValue={selectedSalah}
        		onValueChange={(itemValue, itemIndex) =>
        			{
        				onSalahChange(itemValue)
        			}
        		}>
		        <Picker.Item label="Fajr" value="Fajr" />
        		<Picker.Item label="Zuhr" value="Zuhr" />
		        <Picker.Item label="Asr" value="Asr" />
        		<Picker.Item label="Maghrib" value="Maghrib" />
		        <Picker.Item label="Isha" value="Isha" />
        		<Picker.Item label="Jumma" value="Jumma" />
		      </Picker>
		          <Text style={styles.centerText}>

		          </Text>
		          <Text style={styles.centerText}>

		          </Text>

            </View>
            <View style={styles.sectionDescription}>
		      <QRCodeScanner ref={(ref) => this.scanner = ref}
        		onRead={this.onSuccess}
		        flashMode={RNCamera.Constants.FlashMode.auto}
        		topContent={
		          <Text style={styles.centerText}>

		          </Text>
        		}
				bottomContent={
        		  <TouchableOpacity style={styles.buttonTouchable}>
		            <Text style={styles.buttonText}></Text>
        		  </TouchableOpacity>
		        }
		      />
            </View>
            <View style={styles.sectionContainer}>
               <Text />
              <Text onPress={onPressStartAgain} style={styles.sectionDescription}>You have registered {count} musalis. Click here to start scanning again.</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionDescription}>File name : {fileNameWithPath}</Text>
            </View>
              {/*<View style={styles.sectionContainer}>*/}
              {/*    <QRCode*/}
              {/*        value="BEGIN%3AVCARD%0D%0AVERSION%3A3.0%0D%0AN%3A%3Bsdfsdfdsf%3B%3Bsddsfdsfd%3B%0D%0AFN%3Asddsfdsfd+sdfsdfdsf+%0D%0ATEL%3BTYPE%3DCELL%2CVOICE%3Adsfsdfdfds%0D%0AEND%3AVCARD"*/}
              {/*    />*/}
              {/*    <Text />*/}
              {/*</View>*/}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
	textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    textAlign : 'center',
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
