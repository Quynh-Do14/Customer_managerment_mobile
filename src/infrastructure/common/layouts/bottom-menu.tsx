import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { bottomNavigator } from '../../../core/common/navigator';

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <Tab.Navigator
            initialRouteName={"CustomerManagement"}
            // headerShown={false}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderColor: "#246bfd",
                },
            }}
        >
            {
                bottomNavigator.map((it, index) => {
                    return (
                        <Tab.Screen
                            key={index}
                            name={it.name}
                            component={it.component}
                            options={{
                                tabBarIcon: ({ focused, color, size }) => {
                                    if (!focused) {
                                        return <Image source={it.unFocused} />
                                    }
                                    else {
                                        return <Image source={it.focused} />
                                    }
                                },
                            }}
                        />
                    )
                })
            }

        </Tab.Navigator>
    );
}

export default BottomMenu