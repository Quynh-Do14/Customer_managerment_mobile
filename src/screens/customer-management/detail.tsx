import React from 'react'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { useNavigation } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { LevelConfig } from '../../infrastructure/helper/helper'
import { CustomerState } from '../../core/atoms/customer/customerState'

const DetailCustomer = () => {
    const customerData = useRecoilValue(CustomerState);
    const navigation = useNavigation();
    const onBack = () => {
        navigation.goBack()
    }

    return (
        <MainLayout
            title={"Chi tiết hợp đồng"}
            isBackButton={true}
            onGoBack={onBack}
        >
            <View style={styles.container}>

                <Text
                    style={styles.breadcumb}
                >
                    Thông tin hợp đồng
                </Text>
                <ScrollView>
                    <View style={styles.content}>
                        <Text style={styles.label}>Tên khách hàng: </Text>
                        <Text style={styles.value}>{customerData.data.name} </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Level: </Text>
                        <Text style={styles.value}>{LevelConfig(customerData.data.level)} </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Coins: </Text>
                        <Text style={styles.value}>{customerData.data.coins} </Text>
                    </View>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default DetailCustomer
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "column",
        gap: 12,
    },
    content: {
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#d0d0d0",
    },
    breadcumb: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#1e1e1e",
        // borderBottomWidth: 1,
        // borderBottomColor: "#246bfd",
        padding: 4
    },
    label: {
        fontSize: 16,
        fontWeight: "semibold",
        color: "#666666"
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#246bfd"
    },
})