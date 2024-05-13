import React, { useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputTextCommon from '../../infrastructure/common/components/input/input-text-common'
import SelectEmployeeCommon from '../../infrastructure/common/components/input/select-employee-common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from '../../core/common/constant'

const AddCustomer = () => {
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

    const onAddCustomerAsync = async () => {
        const customer = await AsyncStorage.getItem("customer").then((result: any) => {
            return JSON.parse(result)
        });
        const initial = []

        await setSubmittedTime(Date.now());
        if (isValidData()) {
            const data = {
                id: customer?.length + 1,
                name: dataCustomer.name,
                level: dataCustomer.level,
                address: dataCustomer.address,
                phone: dataCustomer.phone,
                cccd: dataCustomer.cccd,
            }
            customer?.push(
                data
            )
            await AsyncStorage.setItem("customer", JSON.stringify(customer))
            if (customer) {
                customer?.push(
                    data
                )
                console.log("customer", customer);
                await AsyncStorage.setItem("customer", JSON.stringify(customer))
                onBack();
            }
            else {
                initial?.push(
                    data
                )
                console.log("initial", initial);
                await AsyncStorage.setItem("customer", JSON.stringify(initial))
                onBack();
            }
        }
    }
    return (
        <MainLayout
            title={"Thêm mới khách hàng"}
            isBackButton={true}
            onGoBack={onBack}
        >
            <View style={styles.container}>

                <Text
                    style={styles.breadcumb}
                >
                    Thông tin khách hàng
                </Text>
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
                        onPress={onAddCustomerAsync}
                    >
                        <Text style={styles.textBtnStyle}>Thêm mới</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MainLayout>
    )
}

export default AddCustomer
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
    }
})