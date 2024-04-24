import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import NewsCard from '../../components/News'

const Home = () => {
  return (
    <SafeAreaView style={{height:'full'}}>
     
         <View style={{justifyContent:'space-between',alignItems:'center', flexDirection:'row', padding:'8%'}}>
         <Text style={{fontSize:25, fontWeight:'700', color:'green'}}>PlantCare Pro</Text>
         <Image source={icons.search} style={{width:30, height:30}}></Image>
         </View>
         <View style={{alignItems:'center', paddingBottom:20}} >
          <Image source={images.home} style={{alignSelf:'center', width:340}}resizeMode='contain'></Image>
          <CustomButton 
          title="Diagnose Your Plant"
          handlePress={() => router.push("/scan")}
          containerStyles=" bg-green-300 mt-7 h-14 items-center justify-center"/>
         </View>
         <Text style={{fontSize:25, fontWeight:600, paddingLeft:"8%",padding:2}}>Latest News</Text>
         <SafeAreaView>
        <NewsCard/>
        </SafeAreaView>
    </SafeAreaView>
  )
}

export default Home