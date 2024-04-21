import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  return (
  
      <View >
      <Image source={images.auth} style={{ width:'100%',  margin:'0px', padding:'100px' }} resizeMode='cover' ></Image>
      <Text style={{fontWeight:'600', padding:'5%' ,paddingTop:'10%', fontSize:20}}>Welcome to PlantCare Pro!</Text>
      </View>

  )
}

export default SignIn