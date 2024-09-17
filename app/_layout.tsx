import { View, Text, Image, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  viewD: {
    backgroundColor: '#87CEEB',
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 5,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  text: {
    fontSize: 20,
    color: '#003366',
    textAlign: 'justify',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 16,
  },
});

const Layout = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [displayEmail, setDisplayEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail) {
          setEmail(storedEmail);
          setDisplayEmail(storedEmail);
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('email', email);
      setDisplayEmail(email);
      console.log('Email saved:', email);
    } catch (error) {
      console.error('Failed to save email:', error);
    }
  };

  const renderText = () => {
    if (!data) return '';
    return `
      Username: 
      ${data.username}
      
      Name: 
      ${data.name}
      
      Email: 
      ${displayEmail}
      
      Address: 
      ${data.address.street}, 
      ${data.address.suite}, 
      ${data.address.city}, 
      ${data.address.zipcode}
      
      Geolocation: 
      ${data.address.geo.lat}, ${data.address.geo.lng}
      
      Phone Number: 
      ${data.phone}
      
      Website: 
      ${data.website}
      
      Company: 
      ${data.company.name}
      
      Company Catch Phrase: 
      ${data.company.catchPhrase}
    `;
  };

  return (
    <View style={styles.viewD}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          <Image
            style={styles.image}
            source={{ uri: 'https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/characters/cyno/image.png' }}
          />
          <Text style={styles.text}>
            {renderText()}
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter your email"
          />
          <Button
            title="Save"
            onPress={handleSave}
            style={styles.button}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Layout;
