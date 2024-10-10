import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  Button,
  View,
  Platform,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import ImageUploader from "../../Components/ImageUploader";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = ({ navigation }) => {
  const [text, setText] = useState("");
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [channels, setChannels] = useState([]);
  // const [notification, setNotification] = useState(undefined);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

  //   if (Platform.OS === 'android') {
  //     Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
  //   }
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(notificationListener.current);
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <Text style={styles.baseText}>
    //     <Text className="text-6xl text-green-700">HOME</Text>
    //     <Button
    //       title="Go to Login"
    //       onPress={() => navigation.navigate('doctorSchedule')}
    //     />
    //   </Text>
    //   <ImageUploader />
    // </SafeAreaView>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-gray-100">
        {/* Header với ô tìm kiếm */}
        <View className="bg-green-500 p-4">
          <Text className="text-white text-center text-lg font-bold">
            HCS - Health Care
          </Text>
          <Text className="text-white text-center text-sm">
            Ứng dụng chăm sóc sức khỏe 24/7
          </Text>
          <View className="bg-white rounded-lg mt-4 flex-row items-center px-4 py-2">
            <TextInput
              placeholder="Tìm bệnh viện, bác sĩ"
              className="flex-1 text-gray-600"
            />
          </View>
        </View>

        {/* Banner */}
        <View className="bg-white p-4 mt-4 rounded-lg shadow mx-4">
          <Image
            source={{ uri: "https://www.shutterstock.com/image-photo/hands-doctor-clipboard-writing-notes-600nw-2507090935.jpg" }} // Thay bằng link ảnh banner thật
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Icon cho các tính năng */}
        <View className="bg-white p-4 mt-4 rounded-lg shadow mx-4">
          <Text className="text-gray-700 text-lg font-bold mb-4">
            Tính năng nổi bật
          </Text>
          <View className="flex-row justify-between flex-wrap">
            <TouchableOpacity className="w-1/3 p-2 items-center">
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
                }} // Thay bằng link icon thật
                className="w-12 h-12"
              />
              <Text className="text-gray-700 text-sm mt-2">Mua sắm</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/3 p-2 items-center">
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/2991/2991158.png" }}
                className="w-12 h-12"
              />
              <Text className="text-gray-700 text-sm mt-2">Gọi bác sĩ</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/3 p-2 items-center">
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/2804/2804650.png" }}
                className="w-12 h-12"
              />
              <Text className="text-gray-700 text-sm mt-2">
                Video call với bác sĩ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/3 p-2 items-center">
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/7284/7284037.png" }}
                className="w-12 h-12"
              />
              <Text className="text-gray-700 text-sm mt-2">Hỏi đáp y tế</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/3 p-2 items-center">
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/7757/7757793.png" }}
                className="w-12 h-12"
              />
              <Text className="text-gray-700 text-sm mt-2">
                Cộng đồng sức khỏe
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/3 p-2 items-center">
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/843/843169.png" }}
                className="w-12 h-12"
              />
              <Text className="text-gray-700 text-sm mt-2">
                Nhắc lịch uống thuốc
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phần dưới */}
        <View className="bg-white p-4 mt-4 rounded-lg shadow mx-4">
          <Text className="text-gray-700 text-lg font-bold mb-4">
            Bác sĩ nổi bật
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-700 text-sm">
              Bác sĩ Trần Thị Thanh Nhã
            </Text>
            <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg">
              <Text className="text-white font-bold">Xem thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here', test: { test1: 'more data' } },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     // EAS projectId is used here.
//     try {
//       const projectId =
//         Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//       if (!projectId) {
//         throw new Error('Project ID not found');
//       }
//       token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(token);
//     } catch (e) {
//       token = `${e}`;
//     }
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
