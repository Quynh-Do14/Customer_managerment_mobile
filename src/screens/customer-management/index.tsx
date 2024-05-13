import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { customer } from '../../core/common/data'
import { LevelConfig } from '../../infrastructure/helper/helper'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { CustomerState } from '../../core/atoms/customer/customerState'
import { Picker } from '@react-native-picker/picker';
import Constants from '../../core/common/constant'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomerManagement = () => {
    const [textSearch, setTextSearch] = useState<string>("");
    const [selectLevel, setSelectLevel] = useState<string>("");
    const [data, setData] = useState<Array<any>>([]);
    const [dataFilter, setDataFilter] = useState<Array<any>>([]);

    const isFocused = useIsFocused();
    const navigation = useNavigation<any>();
    const [, setCustomerReducer] = useRecoilState(CustomerState);
    const pickerRef = useRef<any>();

    const getCustomerAsync = async () => {
        const customer = await AsyncStorage.getItem("customer").then((result: any) => {
            return JSON.parse(result)
        });
        setData(customer);
    }
    useEffect(() => {
        getCustomerAsync().then(() => { });
    }, []);

    useEffect(() => {
        if (data?.length) {
            setDataFilter(data)
        }
    }, [data])

    const onChangeText = (value: string) => {
        setTextSearch(value)
        let arrConvert
        if (value) {
            arrConvert = data.filter((it: any) => it.name.toLowerCase().includes(value.toLowerCase()))
        }
        else if (value && selectLevel) {
            arrConvert = data.filter((it: any) => it.name.toLowerCase().includes(value.toLowerCase()) && it.level == selectLevel)
        }
        else {
            arrConvert = data
        }
        if (value == "" && selectLevel == "") {
            setDataFilter(data)
        }
        setDataFilter(arrConvert)
    }

    const onSelectLevel = (value: string) => {
        setSelectLevel(value)
        let arrConvert
        if (value) {
            arrConvert = data.filter((it: any) => it.level == value)
        }
        else if (value && textSearch) {
            arrConvert = data.filter((it: any) => it.level == value && it.name.toLowerCase().includes(textSearch.toLowerCase()))
        }
        else {
            arrConvert = data
        }
        if (value == "" && textSearch == "") {
            setDataFilter(data)
        }
        setDataFilter(arrConvert)
    }

    const onNavigateDetail = async (item: any) => {
        navigation.navigate(
            "DetailCustomer",
            setCustomerReducer(
                {
                    data: {
                        id: item.id,
                        name: item.name,
                        address: item.address,
                        level: item.level,
                        phone: item.phone,
                        cccd: item.cccd,
                    }
                }
            )
        )
    }

    useEffect(() => {
        if (isFocused) {
            setTextSearch("");
            setDataFilter(data);
            getCustomerAsync().then(() => { });
        }
    }, [isFocused]);

    return (
        <MainLayout
            title={"Quản lý khách hàng"}
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
                        "AddCustomer"
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
            <View>
                <Picker
                    ref={pickerRef}
                    selectedValue={selectLevel}
                    onValueChange={onSelectLevel}
                    style={{
                        padding: 0,
                        color: "#246bfd",
                        fontFamily: "Roboto Regular",
                        fontWeight: "900",
                        marginBottom: 12,
                        borderColor: "#38a7ff",
                        borderWidth: 1,
                    }}
                    dropdownIconColor={"#246bfd"}
                    mode='dropdown'
                    placeholder='Chọn loại khách hàng'
                >
                    <Picker.Item enabled={true} color={"#1d86dc"} label={"Chọn loại khách hàng"} value="" />
                    {
                        Constants.Level.List.map((it, index) => {
                            return (
                                <Picker.Item key={index} label={it.label} value={it.value} />
                            )
                        })
                    }
                </Picker>
            </View>
            {
                dataFilter && dataFilter.length
                    ?
                    <View>
                        <ScrollView>
                            <View style={styles.container}>
                                {
                                    dataFilter && dataFilter.length && dataFilter.map((it, index) => {
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
                                                            Địa chỉ:
                                                        </Text>
                                                        <Text
                                                            style={styles.value}
                                                        >
                                                            {it.address}
                                                        </Text>
                                                    </View>
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
                        ]}>Chưa có khách hàng</Text>
                    </View>
            }

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
        borderRadius: 12
    },
})