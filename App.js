import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const App = () => {
  const [profile, setprofile] = useState('User');
  const [id, setid] = useState('');
  useEffect(() => {
    // Initialize Google Sign-In
    GoogleSignin.configure();
  }, []);
  const signIn = async () => {
    //Alert.alert('hoo'); // Uncomment for debugging
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, '------------------->>');
      setprofile(userInfo.user.name);
      setid(userInfo.user.id);
      console.log(profile);
    } catch (error) {
      console.log(error, '.........y');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error, '----->>>>a');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error, '.........>>>b');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error, '..........>>>>c');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 23,
          fontSize: 25,
          fontWeight: 800,
          color: 'black',
        }}>
        Sign In with Google
      </Text>
      <TouchableOpacity style={styles.signinbtn} onPress={() => signIn()}>
        <Text style={{color: 'black', fontWeight: '800', fontSize: 20}}>
          Google Sign-In with abhilash Mohanthy
        </Text>
      </TouchableOpacity>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 24,
              color: 'black',
            }}>
            Welcome,{' '}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {profile}
          </Text>
        </View>

        <Text>{id}</Text>
      </View>
    </View>
  );
};

StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinbtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signinbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 40,
    width: '80%',
    height: 45,
    backgroundColor: 'orange',
  },
});
