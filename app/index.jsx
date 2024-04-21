import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import {  View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { images } from "../constants";
import { ImageBackground } from "react-native";
import CustomButton from "../components/CustomButton";



const Welcome = () => {

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:"100%"}}>
      <View className="w-full justify-center items-center h-full b">
       <ImageBackground source={images.landing} className="w-full h-full items-center ">
        <View className="pt-20 pb-12">
          <Text className="text-white font-pextrabold text-3xl px-3 leading-10 align-middle">PlantCare Pro</Text>
        </View>
        <View className=" justify-center items-center pb-10 pt-4">
          <Image source={images.landcard} className=" w-80 h-60" resizeMode="contain"></Image>
          <Text className="text-white font-pbold text-3xl px-3 leading-10 align-middle"> Our AI Powered Disease Detection</Text>
          <Text className=" text-blue-300 py-4 text-xl font-pextrabold">Scan. Solve. Grow</Text>
          </View>
          <View className="items-center justify-center pb-7 pt-3">
          <CustomButton
            title="Scan Now"
            handlePress={() => router.push("/home")}
            containerStyles="h-[62px] mt-7 items-center justify-center"
          />
          </View>
          
       </ImageBackground>
      </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;