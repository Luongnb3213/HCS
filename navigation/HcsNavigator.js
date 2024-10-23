import React, { useContext } from "react";
import AuthContext from '../constants/AuthContext';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Authentication from "./Authentication";
import { Home, Test } from "../screens/Home";
import { HomeUser } from "../screens/User/";
import { HomeNofication } from "../screens/Nofication/";
import { HomeSocial } from "../screens/Social/";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MedicalSchedule from "../screens/Schedule/MedicalSchedule";
import DoctorSchedule from "../screens/Schedule/ScheduleDoctor";
import HealthProfile from "../screens/User/HealthProfile";
import EditProfile from "../screens/User/EditProfile";
import HealthReport from "../screens/User/HealthReport";
import DoctorAppointment from "../screens/Schedule/DoctorAppointment";;
import BookingScreen from "../screens/Schedule/BookingScreen";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const HomeStack = createStackNavigator();
  return (
    <>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {user ? (
          <>
            <HomeStack.Screen
              options={{
                gestureDirection: 'horizontal',
                gestureEnabled: true,
              }}
              name="Home"
              component={Home}
            />
            <HomeStack.Screen name="bookingscreen" component={BookingScreen} />
            <HomeStack.Screen
              name="medicalSchedule"
              component={MedicalSchedule}
            />
            <HomeStack.Screen
              name="doctorSchedule"
              component={DoctorSchedule}
            />
            <HomeStack.Screen
              name="doctorappointment"
              component={DoctorAppointment}
            />
          </>
        ) : (
          <>
            <HomeStack.Screen
              options={{
                gestureDirection: 'horizontal',
                gestureEnabled: true,
              }}
              name="Home"
              component={Home}
            />
            <HomeStack.Screen
              name="Authentication"
              component={Authentication}
            />
          </>
        )}
      </HomeStack.Navigator>
    </>
  );
};
const NoficationScreen = () => {
  const nofiStack = createStackNavigator();
  const { user } = useContext(AuthContext);
  return (
    <nofiStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <nofiStack.Screen name="Notification" component={HomeNofication} />
      ) : (
        <nofiStack.Screen name="Authentication" component={Authentication} />
      )}
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

      {/* Thêm màn hình HealthReport */}
      <InfoStack.Screen
        name="HealthReport"
        component={HealthReport}
        options={{ headerShown: false }} // Tùy chọn ẩn header nếu cần
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
