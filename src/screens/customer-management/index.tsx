import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { customer } from '../../core/common/data'
import { LevelConfig } from '../../infrastructure/helper/helper'
import { useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { CustomerState } from '../../core/atoms/customer/customerState'

const CustomerManagement = () => {
    const [textSearch, setTextSearch] = useState<string>("");
    const [dataFilter, setDataFilter] = useState<Array<any>>([]);
    const navigation = useNavigation<any>();
    const [, setCustomerReducer] = useRecoilState(CustomerState);

    const onChangeText = (value: string) => {
        setTextSearch(value)
        let arrConvert = customer.filter((it: any) => it.name.toLowerCase().includes(value.toLowerCase()))
        setDataFilter(arrConvert)
    }
    useEffect(() => {
        setDataFilter(customer)
    }, [customer])

    const onNavigateDetail = (item: any) => {
        navigation.navigate(
            "DetailCustomer",
            setCustomerReducer(
                {
                    data: {
                        name: item.name,
                        coins: item.coins,
                        level: item.level,
                    }
                }
            )
        )
    }
    return (
        <MainLayout
            title={"Quản lý khách hàng"}
        >

            <Text
                style={styles.breadcumb}
            >
                Danh sách khách hàng
            </Text>
            <View>
                <TextInput
                    placeholder='Tìm kiếm tên khách hàng'
                    placeholderTextColor={"#246bfd"}
                    style={[
                        styles.inputStyle,
                        styles.value,
                        {
                            position: "relative"
                        }
                    ]}
                    value={textSearch}
                    onChangeText={onChangeText}
                />
                <Image
                    source={require("../../../assets/images/search.png")}
                    style={styles.searchIcon}
                />
            </View>

            <ScrollView>
                <View style={styles.container}>
                    {
                        dataFilter.map((it, index) => {
                            return (
                                <Pressable
                                    onPress={() => onNavigateDetail(it)}
                                    key={index}
                                    style={styles.content}
                                >
                                    <View>
                                        <Text
                                            style={styles.title}
                                        >{it.name}</Text>
                                    </View>
                                    <View style={styles.flexCommon}>
                                        <View
                                            style={styles.flex}
                                        >
                                            <Text
                                                style={styles.label}
                                            >
                                                Level:
                                            </Text>
                                            <Text
                                                style={styles.value}
                                            >
                                                {LevelConfig(it.level)}
                                            </Text>
                                        </View>
                                        <View
                                            style={styles.flex}
                                        >
                                            <Text
                                                style={styles.label}
                                            >
                                                Coins:
                                            </Text>
                                            <Text
                                                style={styles.value}
                                            >
                                                {it.coins}
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </MainLayout>
    )
}

export default CustomerManagement;
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "column",
        gap: 12
    },
    flexCommon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        gap: 4
    },
    content: {
        backgroundColor: "#F5F5F5",
        padding: 12,
        borderRadius: 12,
        // elevation: 1, 
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    breadcumb: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#1e1e1e",
        marginBottom: 8,
        // borderBottomWidth: 1,
        // borderBottomColor: "#246bfd",
        paddingBottom: 4
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1e1e1e"
    },
    label: {
        fontSize: 13,
        fontWeight: "semibold",
        color: "#666666"
    },
    value: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#246bfd"
    },
    inputStyle: {
        backgroundColor: "#FFFFFF",
        borderColor: "#38a7ff",
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    searchIcon: {
        position: "absolute",
        right: 12,
        top: 8,
    },
})