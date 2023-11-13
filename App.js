import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native'
import * as Progress from 'react-native-progress'
import { Feather } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'

export default function App(){

  const [passwordValue, setPasswordValue] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const special = ['!', '@', '#', '$', '%', '&', '*']
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  let specialCount = 0
  let numbersCount = 0
  let upperCount = 0
  let charCount = 0
  let charCountPoints = 0

  function count(){
    for (c = 0; c < passwordValue.length; c++){
      special.indexOf(passwordValue[c]) != -1 && specialCount < 0.25 ? specialCount += 0.25 : null
      numbers.indexOf(passwordValue[c]) != -1 && numbersCount < 0.25 ? numbersCount += 0.25 : null
      upper.indexOf(passwordValue[c]) != -1 && upperCount < 0.25 ? upperCount += 0.25 : null
      charCount += 1
      charCount >= 6 && charCountPoints < 0.25 ? charCountPoints += 0.25 : null
    }
    return specialCount + numbersCount + upperCount + charCountPoints
  }

  async function copyPassword(){
    await Clipboard.setStringAsync(passwordValue)
    alert('Your password has been copied to your clipboard!')
  }

  async function error(){
    alert('Your password is not safe enough!')
  }

  return(
    <View style={darkMode === false ? styles.containerLight : styles.containerDark}>
      <View style={styles.header}>
        <Feather name={darkMode === false ? 'moon' : 'sun'} color={darkMode === false ? '#6CA6C1' : '#F7FFF7'} size={20} />
        <Switch
          value={darkMode}
          onValueChange={() => {
            setDarkMode(!darkMode)
          }}
        />
      </View>
      <TextInput style={darkMode === false ? styles.textInputLight : styles.textInputDark} value={passwordValue} onChangeText={(value) => {
          setPasswordValue(value)
        }}></TextInput>

      <Progress.Bar progress={count()} color={darkMode === false ? '#6CA6C1' : '#4A4E69'} style={styles.bar} />

      <View style={styles.passwordRequirements}>
        <Text style={darkMode === false ? styles.requirementsLight : styles.requirementsDark}>{(specialCount / 0.25).toFixed(0)}/1 special characters</Text>
        <Text style={darkMode === false ? styles.requirementsLight : styles.requirementsDark}>{(numbersCount / 0.25).toFixed(0)}/1 numbers</Text>
        <Text style={darkMode === false ? styles.requirementsLight : styles.requirementsDark}>{(upperCount / 0.25).toFixed(0)}/1 uppercase letters</Text>
        <Text style={darkMode === false ? styles.requirementsLight : styles.requirementsDark}>{(charCount).toFixed(0)}/6 total length</Text>
      </View>

      <TouchableOpacity style={darkMode === false ? styles.btnLight : styles.btnDark} onPress={specialCount >= 0.25 && numbersCount >= 0.25 && upperCount >= 0.25 && charCountPoints >= 0.25 ? copyPassword : error}>
        <Text style={styles.btnText}>Copy</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#F7FFF7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#22223B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textInputLight: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#6CA6C1',
    width: '80%',
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  textInputDark: {
    backgroundColor: '#4A4E69',
    borderWidth: 2,
    borderColor: '#F7FFF7',
    width: '80%',
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  bar: {
    margin: 20,
  },
  btnLight: {
    backgroundColor: '#6CA6C1',
    padding: 5,
    borderRadius: 10,
    width: '20%'
  },
  btnDark: {
    backgroundColor: '#4A4E69',
    padding: 5,
    borderRadius: 10,
    width: '20%'
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  passwordRequirements: {
    marginBottom: 20
  },
  requirementsLight: {
    color: 'black',
    fontSize: 15
  },
  requirementsDark: {
    color: '#F7FFF7',
    fontSize: 15
  },
})