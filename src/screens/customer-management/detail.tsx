import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { useNavigation } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LevelConfig } from '../../infrastructure/helper/helper'
import { CustomerState } from '../../core/atoms/customer/customerState'
import InputTextCommon from '../../infrastructure/common/components/input/input-text-common'
import SelectEmployeeCommon from '../../infrastructure/common/components/input/select-employee-common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from '../../core/common/constant'

const DetailCustomer = () => {
    const customerData = useRecoilValue(CustomerState);
    const navigation = useNavigation();
    const onBack = () => {
        navigation.goBack()
    }

    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);

    const dataCustomer = _data;
    const setDataCustomer = (data: any) => {
        Object.assign(dataCustomer, { ...data });
        _setData({ ...dataCustomer });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };

    useEffect(() => {
        if (customerData) {
            setDataCustomer({
                id: customerData.data.id,
                name: customerData.data.name,
                level: customerData.data.level,
                address: customerData.data.address,
                phone: customerData.data.phone,
                cccd: customerData.data.cccd,

            });
        };
    }, [customerData]);



    const onUpdateCustomerAsync = async () => {
        const customer = await AsyncStorage.getItem("customer").then((result: any) => {
            return JSON.parse(result)
        });

        const updateObject = async (newObject: object) => {
            try {
                const updatedData = [...customer];
                updatedData[index] = newObject;
                await AsyncStorage.setItem('customer', JSON.stringify(updatedData));
                onBack();
            } catch (error) {
            }
        };
        const index = customer.findIndex((it: any) => it.id == dataCustomer.id)

        await setSubmittedTime(Date.now());
        if (isValidData()) {
            const data = {
                id: dataCustomer.id,
                name: dataCustomer.name,
                level: dataCustomer.level,
                address: dataCustomer.address,
                phone: dataCustomer.phone,
                cccd: dataCustomer.cccd,
            }
            updateObject(data)
        }
    }

    const onDeleteCustomer = async () => {
        Alert.alert('Xóa khách hàng', 'Bạn muốn xóa khách hàng?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Xóa ', onPress: async () => {
                    const customer = await AsyncStorage.getItem("customer").then((result: any) => {
                        return JSON.parse(result)
                    });
                    const deleteItem = customer.filter((item: any) => item.id !== dataCustomer.id);
                    await AsyncStorage.setItem('customer', JSON.stringify(deleteItem));
                    onBack()
                },
            }
        ]);
    }
    return (
        <MainLayout
            title={"Chi tiết khách hàng"}
            isBackButton={true}
            onGoBack={onBack}
        >
            <View style={styles.container}>

                <View style={[
                    styles.flexCommon,
                    { marginBottom: 8 }
                ]}>
                    <Text
                        style={styles.breadcumb}
                    >
                        Danh sách khách hàng
                    </Text>
                    <Pressable style={styles.btn} onPress={onDeleteCustomer}>
                        <Text
                            style={styles.textBtnStyle}
                        >
                            Xóa khách hàng
                        </Text>
                    </Pressable>
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        <InputTextCommon
                            label={"Tên khách hàng"}
                            attribute={"name"}
                            dataAttribute={dataCustomer.name}
                            isRequired={false}
                            setData={setDataCustomer}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <SelectEmployeeCommon
                            label={"Loại khách hàng"}
                            attribute={"level"}
                            dataAttribute={dataCustomer.level}
                            isRequired={false}
                            setData={setDataCustomer}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            dataList={Constants.Level.List}
                            labelNon={'Phân loại khách hàng'}
                        />
                        <InputTextCommon
                            label={"Địa chỉ"}
                            attribute={"address"}
                            dataAttribute={dataCustomer.address}
                            isRequired={false}
                            setData={setDataCustomer}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"SĐT"}
                            attribute={"phone"}
                            dataAttribute={dataCustomer.phone}
                            isRequired={false}
                            setData={setDataCustomer}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"CCCD"}
                            attribute={"cccd"}
                            dataAttribute={dataCustomer.cccd}
                            isRequired={false}
                            setData={setDataCustomer}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={onUpdateCustomerAsync}
                    >
                        <Text style={styles.textBtnStyle}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>
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
    flexCommon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    btnStyle: {
        backgroundColor: "#246bfd",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
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