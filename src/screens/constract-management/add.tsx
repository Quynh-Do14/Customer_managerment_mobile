import React, { useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputTextCommon from '../../infrastructure/common/components/input/input-text-common'
import SelectEmployeeCommon from '../../infrastructure/common/components/input/select-employee-common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from '../../core/common/constant'

const AddConstract = () => {
    const navigation = useNavigation();
    const onBack = () => {
        navigation.goBack()
    }
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);

    const dataConstract = _data;
    const setDataConstract = (data: any) => {
        Object.assign(dataConstract, { ...data });
        _setData({ ...dataConstract });
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

    const onAddConstractAsync = async () => {
        const constract = await AsyncStorage.getItem("constract").then((result: any) => {
            return JSON.parse(result)
        });
        const initial = []
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            const data = {
                id: constract?.length ? constract?.length + 1 : 1,
                name: dataConstract.name,
                customer: dataConstract.customer,
                price: dataConstract.price,
                policy: dataConstract.policy,
                status: dataConstract.status,
            }
            if (constract) {
                constract?.push(
                    data
                )
                console.log("constract", constract);
                await AsyncStorage.setItem("constract", JSON.stringify(constract))
                onBack();
            }
            else {
                initial?.push(
                    data
                )
                console.log("initial", initial);
                await AsyncStorage.setItem("constract", JSON.stringify(initial))
                onBack();
            }
        }
    }

    return (
        <MainLayout
            title={"Thêm mới hợp đồng"}
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
                        <InputTextCommon
                            label={"Tên hợp đồng"}
                            attribute={"name"}
                            dataAttribute={dataConstract.name}
                            isRequired={false}
                            setData={setDataConstract}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Tên khách hàng"}
                            attribute={"customer"}
                            dataAttribute={dataConstract.customer}
                            isRequired={false}
                            setData={setDataConstract}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Giá trị hợp đồng"}
                            attribute={"price"}
                            dataAttribute={dataConstract.price}
                            isRequired={false}
                            setData={setDataConstract}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Điều khoản"}
                            attribute={"policy"}
                            dataAttribute={dataConstract.policy}
                            isRequired={false}
                            setData={setDataConstract}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <SelectEmployeeCommon
                            label={"Trạng thái"}
                            attribute={"status"}
                            dataAttribute={dataConstract.status}
                            isRequired={false}
                            setData={setDataConstract}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            dataList={Constants.Status.List}
                            labelNon={'Trạng thái'}
                        />
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={onAddConstractAsync}
                    >
                        <Text style={styles.textBtnStyle}>Thêm mới</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MainLayout>
    )
}

export default AddConstract
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