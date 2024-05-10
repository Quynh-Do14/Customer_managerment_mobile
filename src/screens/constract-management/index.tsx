import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { constract } from '../../core/common/data'
import { LevelConfig, StatusConfig } from '../../infrastructure/helper/helper'
import { useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { ConstractState } from '../../core/atoms/constract/constractState'

const ConstractManagement = () => {
    const [textSearch, setTextSearch] = useState<string>("");
    const [dataFilter, setDataFilter] = useState<Array<any>>([]);
    const navigation = useNavigation<any>();
    const [, setConstractReducer] = useRecoilState(ConstractState);
    const onChangeText = (value: string) => {
        setTextSearch(value)
        let arrConvert = constract.filter((it: any) => it.name.toLowerCase().includes(value.toLowerCase()))
        setDataFilter(arrConvert)
    }
    useEffect(() => {
        setDataFilter(constract)
    }, [constract])

    const onNavigateDetail = (item: any) => {
        navigation.navigate(
            "DetailConstract",
            setConstractReducer(
                {
                    data: {
                        name: item.name,
                        customer: item.customer,
                        date: item.date,
                        level: item.level,
                        price: item.price,
                        status: item.status,
                    }
                }
            )
        )
    }
    return (
        <MainLayout
            title={"Quản lý hợp đồng"}
        >

            <Text
                style={styles.breadcumb}
            >
                Danh sách hợp đồng
            </Text>
            <View>
                <TextInput
                    placeholder='Tìm kiếm tên hợp đồng'
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

                                    <View
                                        style={styles.flex}
                                    >
                                        <Text
                                            style={styles.label}
                                        >
                                            Khách hàng:
                                        </Text>
                                        <Text
                                            style={styles.value}
                                        >
                                            {it.customer}
                                        </Text>
                                    </View>

                                    <View style={styles.flexCommon}>
                                        <View
                                            style={styles.flex}
                                        >
                                            <Text
                                                style={styles.label}
                                            >
                                                Ngày kí:
                                            </Text>
                                            <Text
                                                style={styles.value}
                                            >
                                                {it.date}
                                            </Text>
                                        </View>
                                        <View
                                            style={styles.flex}
                                        >
                                            <Text
                                                style={styles.value}
                                            >
                                                {StatusConfig(it.status)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={styles.flex}
                                    >
                                        <Text
                                            style={styles.label}
                                        >
                                            Giá trị hợp đồng:
                                        </Text>
                                        <Text
                                            style={styles.value}
                                        >
                                            {it.price} VNĐ
                                        </Text>
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

export default ConstractManagement;
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