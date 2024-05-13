import React, { useCallback, useEffect, useState } from 'react'
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { LevelConfig, StatusConfig } from '../../infrastructure/helper/helper'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { ConstractState } from '../../core/atoms/constract/constractState'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ConstractManagement = () => {
    const [textSearch, setTextSearch] = useState<string>("");
    const [dataFilter, setDataFilter] = useState<Array<any>>([]);
    const [data, setData] = useState<Array<any>>([]);
    
    const isFocused = useIsFocused();
    const navigation = useNavigation<any>();
    const [, setConstractReducer] = useRecoilState(ConstractState);

    const onChangeText = (value: string) => {
        setTextSearch(value)
        let arrConvert = data.filter((it: any) => it.name.toLowerCase().includes(value.toLowerCase()))
        setDataFilter(arrConvert)
    }

    const getConstractAsync = async () => {
        const constract = await AsyncStorage.getItem("constract").then((result: any) => {
            return JSON.parse(result)
        });
        setData(constract)
    }
    useEffect(() => {
        getConstractAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (data?.length) {
            setDataFilter(data)
        }
    }, [data])


    const onNavigateDetail = (item: any) => {
        navigation.navigate(
            "DetailConstract",
            setConstractReducer(
                {
                    data: {
                        id: item.id,
                        name: item.name,
                        customer: item.customer,
                        date: item.date,
                        price: item.price,
                        policy: item.policy,
                    }
                }
            )
        )
    }

    useEffect(() => {
        if (isFocused) {
            setTextSearch("");
            setDataFilter(data);
            getConstractAsync().then(() => { });
        }
    }, [isFocused]);


    return (
        <MainLayout
            title={"Quản lý hợp đồng"}
        >
            <View style={[
                styles.flexCommon,
                { marginBottom: 8 }
            ]}>
                <Text
                    style={styles.breadcumb}
                >
                    Danh sách khách hàng
                </Text>

                <Pressable style={styles.btn} onPress={() => {
                    navigation.navigate(
                        "AddConstract"
                    )
                }}>
                    <Text
                        style={styles.textBtnStyle}
                    >
                        Thêm mới
                    </Text>
                </Pressable>
            </View>


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
            {
                dataFilter && dataFilter.length
                    ?
                    <View>
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
                                                    {/* <View
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
                                                    </View> */}
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
                    </View>
                    :
                    <View>
                        <Text style={[
                            {
                                textAlign: "center"
                            },
                            styles.fontStyle
                        ]}>Chưa có hợp đồng</Text>
                    </View>
            }

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
    fontStyle: {
        color: "#1e1e1e",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },
    textBtnStyle: {
        fontSize: 16,
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },
    btn: {
        backgroundColor: "#3d7bf8",
        padding: 10,
        borderRadius: 12,
    },
})