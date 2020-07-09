import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, TouchableWithoutFeedback,  Keyboard, Text, Dimensions, View, Image, TextInput, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { LinearGradient } from 'expo-linear-gradient';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { GlobalScreen } from './GlobalScreen';
import { Toast } from 'react-native-root-toaster';
import { Audio } from 'expo-av';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Registry = () => {
    const [value, setValueNumber] = React.useState('+7 ');
    const [valueSMS, setValueSMS] = React.useState('');
    const [code, setCode] = React.useState(null);
    const [isRegistr, setIsRegistr] = React.useState(false);

    React.useEffect(() => {
        setIsRegistr(false);
        (async () => {
            let { status } = await Audio.requestPermissionsAsync();
            if (status !== 'grantes') {
                Toast.show('Воспроизведение звуков запрещено ', 5000);
            }
        })
        
    }, [])
    const Auts = new Audio.Sound();

    const pushSms = enter => {
        setValueNumber('+7 ');
    }
    const CodeRefire = number => {
        setValueSMS(number)
        if (number.length == 4) {
            if (number != code) {
                Alert.alert(
                    "Ошибка",
                    "Не верный код подтверждения"
                );

            } else {
                setIsRegistr(true)
            }
        }
    }
    const numberEdit = text => {
        if (text.length < 3) {
            setValueNumber('+7 ');
            return;
        }
        let format = '';
        if (text.length == 7 && text[7] != ' ') {
            let k = text.substring(0, 6);
            text = k + ' ' + text.substring(6, text.length);
        }
        if (text.length == 12 && text[10] != ' ') {
            let k = text.substring(0, 10);
            text = k + ' ' + text.substring(10, text.length);
        }
        if (text.length == 15 && text[13] != ' ') {
            let k = text.substring(0, 13);
            text = k + ' ' + text.substring(13, text.length);
        }
        if (text.length == 16) {
            let randomNumber = Math.floor(Math.random() * 1011) + 1209;
            Toast.show(`Code: ${randomNumber}`);
            try{
                Auts.loadAsync(require('../assets/soung/push.mp3')).then(() => {
                    Auts.playAsync();
                })
               
            }catch (err) {

            }
            setCode(randomNumber);
        }
        setValueNumber(text)

    }
    if (isRegistr) {
        return <GlobalScreen />
    } else 
        return (
        <>
            <LinearGradient
                colors={['#323338', '#1d1e1e', 'black']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{
                    position: 'absolute',
                    left: -100,
                    right: -100,
                    top: 0,
                    height: '100%'
                }}
                    
            />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.body} >
                <Image style={styles.logo} source={require('../assets/images/logo.jpeg')} />
                <View style={styles.form}>
                    <Text style={styles.titleInput}>TEL </Text>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#1d1e1e', '#323338']}>
                        <TextInput
                            keyboardType={'numeric'}
                            onSubmitEditing={(e) => pushSms(e)}
                            style={styles.input}
                            value={value}
                            onChangeText={(number) => numberEdit(number)} />
                    </LinearGradient>
                    <Text style={styles.titleInput}>SMS CODE </Text>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#1d1e1e', '#323338']}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={styles.input}
                            value={valueSMS}
                            onChangeText={(number) => CodeRefire(number)} />
                    </LinearGradient>
                </View>
            </View>
            </TouchableWithoutFeedback>
            <Text style={styles.help}> HELP </Text>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    logo: {
        width: 130,
        height: 130,
        borderRadius: 25
    },
    body: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50
    },
    form: {
        width: width / 1.4,
        marginTop: 130
    },
    input: {
        height: 35,
        color: '#fafafa',
        paddingLeft: 10,
        fontSize: 18
    },
    titleInput: {
        marginTop: 20,
        color: '#fafafa',
    },
    help: {
        color: '#fafafa',
        position: 'absolute',
        bottom: 35,
        width: '100%',
        textAlign: 'center'
    }
});
