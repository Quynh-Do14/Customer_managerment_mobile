import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'

const Profile = () => {
    const navigation = useNavigation<any>()
    const onLogOut = () => {
        Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Đăng xuất', onPress: () => {
                    navigation.navigate("LoginScreen")
                },
            }
        ]);
    }
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                height: "100%"
            }}>
            <Text
                style={styles.value}
            >
                Quản lý khách hàng
            </Text>
            <Pressable style={styles.btn} onPress={onLogOut}>
                <Text
                    style={styles.label}
                >
                    Đăng xuất</Text>
            </Pressable>
        </View>
    )
}

export default Profile
const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#246bfd",
        padding: 10,
        borderRadius: 6
    },
    label: {
        fontSize: 18,
        fontWeight: "semibold",
        color: "#FFFFFF"
    },
    value: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#246bfd"
    },
})