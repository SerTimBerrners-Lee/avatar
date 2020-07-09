import React from 'react';
import { Text, Modal, View, Dimensions, Platform, DismissKeyboardView, Keyboard , TouchableOpacity, StyleSheet, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MonoText } from '../components/StyledText';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Toast } from 'react-native-root-toaster';
import { Audio } from 'expo-av';  

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let Opacity = 0;
let isDisplay = 'flex';

export const GlobalScreen = () => {
  const [value, setValue] = React.useState('Search Avatar');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isIndex, setIndex] = React.useState(999);
  const Auts = new Audio.Sound();
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('К доступу к местоположению было отказано');
        Toast.show("К доступу к местоположению было отказано", 7000)
      }

     
      
      Location.getCurrentPositionAsync({}) 
        .then(location => {
          console.log(location)
          setLocation(location);
        }).catch()
    })();

    // try {
    //   Audio.setAudioModeAsync({
    //     staysActiveInBackground: true,
    //     playsInSilentModeIOS: true,
    //     allowsRecordingIOS: true,
    //     playThroughEarpieceAndroid: false
    //   }).then(() => {
    //     Auts.loadAsync(require('../assets/soung/lool.mp3')).then((status) => {
    //       Auts.playAsync();
    //     })
    //   })
    // } catch (err) {} 

  }, [])


  return(
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

      <View style={styles.body}>
        
        {
            location ?
              <MapView
                
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={[styles.maps, { zIndex: isIndex }]}
              />  
            :
             <Text> </Text>
        }
         

        <View style={styles.blockSearch}>
          <TextInput 
            value={value}
            onChange={text => setValue(text.nativeEvent.text)}
            style={[styles.inputSearch, {display: isDisplay, zIndex: 99}]}
            />
       
          </View>

          <LinearGradient
            colors={['#323338', '#1d1e1e', 'black']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: 'absolute',
              left: -100,
              right: -100,
              top: 0,
              height: "200%",
              opacity: Opacity
            }}
          />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
           
          <MonoText style={[styles.monoMenuText, {textAlign: 'center', paddingTop: 45}]}>
              8 920 418 38 55
          </MonoText>
            <View style={styles.menu}>
              <TouchableOpacity>
                <MonoText style={styles.monoMenuText}>
                  MY PROFILE
                </MonoText>
              </TouchableOpacity>
            <TouchableOpacity>
              <MonoText style={styles.monoMenuText}>
                PAYMENTS
                </MonoText>
            </TouchableOpacity>
            <TouchableOpacity>
              <MonoText style={styles.monoMenuText}>
                MY AVATARS
                </MonoText>
            </TouchableOpacity>
            <TouchableOpacity>
              <MonoText style={styles.monoMenuText}>
                EQUIPMENT
                </MonoText>
            </TouchableOpacity>
            <TouchableOpacity>
              <MonoText style={styles.monoMenuText}>
                SETTINGS
                </MonoText>
            </TouchableOpacity>
            <TouchableOpacity>
              <MonoText style={styles.monoMenuText}>
                HELP
                </MonoText>
            </TouchableOpacity>
            <TouchableOpacity>
              <MonoText style={styles.monoMenuText}>
                INFO
                </MonoText>
            </TouchableOpacity>
              </View>
          <TouchableOpacity 
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20
            }}
            onPress={() => {
              setModalVisible(false)
              Opacity = 0
              isDisplay = 'flex'
              setIndex(999)
              }}>
            <Ionicons name="md-globe" size={72} color="#8f8b8c" />
          </TouchableOpacity>
          </Modal>
      </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          elevation: 100,
        }}
        onPress={() => {
          setModalVisible(true)
          isDisplay = 'none'
          Opacity = 1
          setIndex(0)
          }}>
        <Ionicons name="md-globe" size={72} style={{
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
            }
          })
        }}/>
      </TouchableOpacity>

    </>
      )
      
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
    height: height
  },
  monoMenuText : {
    fontSize: 19,
    color: '#8f8b8c', 
    padding: 10,
    fontFamily: 'space-mono'
  },
  maps: {
    height: height + height,
    width: width,
    position: 'absolute',
  },
  inputSearch: {
    backgroundColor: '#fafafa',
    height: 50,
    width: "85%",
    fontSize: 23,
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: 'space-mono',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    })
  },
  blockSearch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    padding: 10,
    alignItems:'center'
  },
  menu : {
    height: height - 200,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  }
})