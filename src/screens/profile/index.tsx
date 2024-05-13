import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {
    const [dataConstract, setDataConstract] = useState<Array<any>>([]);
    const [dataCustomer, setDataCustomer] = useState<Array<any>>([]);
    const [revuene, setRevuene] = useState<number>(0);

    const navigation = useNavigation<any>();
    const getCustomerAsync = async () => {
        const customer = await AsyncStorage.getItem("customer").then((result: any) => {
            return JSON.parse(result)
        });
        setDataCustomer(customer);
    }
    useEffect(() => {
        getCustomerAsync().then(() => { });
    }, []);

    const getConstractAsync = async () => {
        const constract = await AsyncStorage.getItem("constract").then((result: any) => {
            return JSON.parse(result)
        });
        setDataConstract(constract);
    }
    useEffect(() => {
        getConstractAsync().then(() => { });
    }, []);

    useEffect(() => {
        const sum = dataConstract.reduce((accumulator, currentValue) => accumulator + currentValue.price, []);
        setRevuene(sum);
    }, [dataConstract])
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
        <MainLayout
            title={"Báo cáo thống kê"}
        >
            <View style={styles.content}>
                <View style={styles.flexCommon}>
                    <View>
                        <Text style={styles.breadcumb}>
                            Thống kê doanh số
                        </Text>
                        <Text style={styles.label}>
                            Doanh số
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.value}>
                            {revuene} VNĐ
                        </Text>
                    </View>
                </View>
                <View style={styles.flexCommon}>
                    <View>
                        <Text style={styles.breadcumb}>
                            Thống kê khách hàng
                        </Text>
                        <Text style={styles.label}>
                            Tổng số khách hàng
                        </Text>
                    </View>
                    <View style={styles.round}>
                        <Text style={styles.value}>
                            {dataCustomer.length}
                        </Text>
                    </View>
                </View>

                <View style={styles.flexCommon}>
                    <View>
                        <Text style={styles.breadcumb}>
                            Thống kê hợp đồng
                        </Text>
                        <Text style={styles.label}>
                            Tổng số hợp đồng
                        </Text>
                    </View>
                    <View style={styles.round}>
                        <Text style={styles.value}>
                            {dataConstract.length}
                        </Text>
                    </View>
                </View>
                <Pressable style={styles.btn} onPress={onLogOut}>
                    <Text style={styles.textBtnStyle}>
                        Đăng xuất</Text>
                </Pressable>
            </View>
        </MainLayout >
    )
}

export default Profile
const styles = StyleSheet.create({
    flexCommon: {
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        elevation: 2,
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        gap: 4
    },
    content: {

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 12
    },
    breadcumb: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1e1e1e",
        marginBottom: 8,

        paddingBottom: 4
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1e1e1e"
    },
    fontStyle: {
        color: "#1e1e1e",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },

    btn: {
        backgroundColor: "#246bfd",
        padding: 10,
        borderRadius: 8
    },
    textBtnStyle: {
        fontSize: 16,
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },
    label: {
        fontSize: 16,
        fontWeight: "semibold",
        color: "#1e1e1e"
    },
    value: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#246bfd"
    },
    round: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#246bfd",
        padding: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 44,
        height: 44
    }
})