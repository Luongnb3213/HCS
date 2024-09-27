import React, { useEffect } from 'react';
import { Login, SignUp } from '../screens/Authentication/';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
const AuthStack = createStackNavigator();
const Authentication = () => {
  const navigation = useNavigation();
  useEffect(() => {
   
    const parentNavigation = navigation.getParent();
    parentNavigation?.setOptions({
      tabBarStyle: { display: 'none' },
    });


    return () => {
      parentNavigation?.setOptions({
        tabBarStyle: { display: 'flex' }
      });
    };
  }, [navigation]);

  return (
    <AuthStack.Navigator
    >
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          gestureEnabled: true,
          headerTitle: 'Đăng Nhập',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          tabBarStyle: { display: 'none' }        
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerTitle: 'Đăng Ký',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
    </AuthStack.Navigator>
  );
};

export default Authentication;
