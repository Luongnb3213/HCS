import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Authentication from './Authentication';
import { Home, Test } from '../screens/Home';
import { HomeUser } from '../screens/User/';
import { HomeNofication } from '../screens/Nofication/';
import { HomeSocial } from '../screens/Social/';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MedicalSchedule from '../screens/Schedule/MedicalSchedule';
import DoctorSchedule from '../screens/Schedule/ScheduleDoctor'
import HealthProfile from "../screens/User/HealthProfile";
import EditProfile from "../screens/User/EditProfile";
const HomeScreen = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureDirection: "horizontal",
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="medicalSchedule" component={MedicalSchedule} />
      <HomeStack.Screen name="doctorSchedule" component={DoctorSchedule} />
      <HomeStack.Screen name="Authentication" component={Authentication} />
    </HomeStack.Navigator>
  );
};
const NoficationScreen = () => {
  const nofiStack = createStackNavigator();
  return (
    <nofiStack.Navigator screenOptions={{ headerShown: false }}>
      <nofiStack.Screen name="Notification" component={HomeNofication} />
    </nofiStack.Navigator>
  );
};
const SocailScreen = () => {
  const SocialStack = createStackNavigator();
  return (
    <SocialStack.Navigator screenOptions={{ headerShown: false }}>
      <SocialStack.Screen name="Socail" component={HomeSocial} />
    </SocialStack.Navigator>
  );
};

const InfoScreen = () => {
  const InfoStack = createStackNavigator();
  return (
    <InfoStack.Navigator>
      {/* Màn hình User không có header */}
      <InfoStack.Screen
        name="Info"
        component={HomeUser}
        options={{ headerShown: false }}
      />

      <InfoStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />

      {/* Màn hình HealthProfile sẽ không có header mặc định */}
      <InfoStack.Screen
        name="HealthProfile"
        component={HealthProfile}
        options={{
          headerShown: false, // Ẩn header mặc định
        }}
      />
    </InfoStack.Navigator>
  );
};

const HcsNavigator = () => {
  const BottomNavigator = createBottomTabNavigator();
  return (
    <BottomNavigator.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#3CB371" }}
    >
      <BottomNavigator.Screen
        name="Trang chủ"
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="home" size={24} color={props.color} />
          ),
        }}
        component={HomeScreen}
      />
      <BottomNavigator.Screen
        name="Cộng đồng"
        options={{
          tabBarIcon: (props) => (
            <AntDesign name="wechat" size={24} color={props.color} />
          ),
        }}
        component={SocailScreen}
      />
      <BottomNavigator.Screen
        name="Thông báo"
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name="notifications-sharp"
              size={24}
              color={props.color}
            />
          ),
        }}
        component={NoficationScreen}
      />
      <BottomNavigator.Screen
        name="Cá nhân"
        options={{
          tabBarIcon: (props) => (
            <FontAwesome name="user" size={24} color={props.color} />
          ),
        }}
        component={InfoScreen}
      />
      {/* <BottomNavigator.Screen
        name="Authentication"
        options={{
         animationEnabled: true,
         tabBarStyle: { display: 'none'},
         tabBarButton: () => null,
         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
        component={Authentication}
      /> */}
    </BottomNavigator.Navigator>
  );
};

export default HcsNavigator;
