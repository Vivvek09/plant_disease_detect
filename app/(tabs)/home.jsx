import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
const Home = () => {
  return (
    <SafeAreaView style={{height:'full'}}>
      <ScrollView>
         <View style={{justifyContent:'space-between',alignItems:'center', flexDirection:'row', padding:'8%'}}>
         <Text style={{fontSize:25, fontWeight:'700', color:'green'}}>PlantCare Pro</Text>
         <Image source={icons.search} style={{width:30, height:30}}></Image>
         </View>
         <View style={{alignItems:'center'}} >
          <Image source={images.home} style={{alignSelf:'center', width:340}}resizeMode='contain'></Image>
          <CustomButton 
          title="Diagnose Your Plant"
          handlePress={() => router.push("/scan")}
          containerStyles=" bg-green-300 mt-7 h-14 items-center justify-center"/>
         </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home