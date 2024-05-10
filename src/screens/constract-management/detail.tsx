import React from 'react'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { useNavigation } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import { ConstractState } from '../../core/atoms/constract/constractState'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { StatusConfig } from '../../infrastructure/helper/helper'

const DetailConstract = () => {
    const constractData = useRecoilValue(ConstractState);
    const navigation = useNavigation();
    const onBack = () => {
        navigation.goBack()
    }
    console.log("constractData", constractData);

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
                        <Text style={styles.label}>Tên hợp đồng: </Text>
                        <Text style={styles.value}>{constractData.data.name} </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Tên khách hàng: </Text>
                        <Text style={styles.value}>{constractData.data.customer} </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Ngày kí: </Text>
                        <Text style={styles.value}>{constractData.data.date} </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Giá trị hợp đồng: </Text>
                        <Text style={styles.value}>{constractData.data.price} VNĐ</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Trạng thái: </Text>
                        <Text style={styles.value}>{StatusConfig(constractData.data.status)} </Text>
                    </View>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default DetailConstract
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