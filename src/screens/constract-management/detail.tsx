import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { useNavigation } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import { ConstractState } from '../../core/atoms/constract/constractState'
import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StatusConfig } from '../../infrastructure/helper/helper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputTextCommon from '../../infrastructure/common/components/input/input-text-common'
import SelectEmployeeCommon from '../../infrastructure/common/components/input/select-employee-common'
import Constants from '../../core/common/constant'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const DetailConstract = () => {
    const constractData = useRecoilValue(ConstractState);
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

    useEffect(() => {
        if (constractData) {
            setDataConstract({
                id: constractData.data.id,
                name: constractData.data.name,
                customer: constractData.data.customer,
                price: constractData.data.price,
                policy: constractData.data.policy,
            });
        };
    }, [constractData]);

    const onUpdateConstractAsync = async () => {
        const constract = await AsyncStorage.getItem("constract").then((result: any) => {
            return JSON.parse(result)
        });

        const updateObject = async (newObject: object) => {
            try {
                const updatedData = [...constract];
                updatedData[index] = newObject;
                await AsyncStorage.setItem('constract', JSON.stringify(updatedData));
                onBack();
            } catch (error) {
            }
        };
        const index = constract.findIndex((it: any) => it.id == dataConstract.id)

        await setSubmittedTime(Date.now());
        if (isValidData()) {
            const data = {
                id: dataConstract.id,
                name: dataConstract.name,
                customer: dataConstract.customer,
                price: dataConstract.price,
                policy: dataConstract.policy,
                status: dataConstract.status,
            }
            updateObject(data)
        }
    }

    const onDeleteConstract = async () => {
        Alert.alert('Xóa hợp đồng', 'Bạn muốn xóa hợp đồng?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Xóa ', onPress: async () => {
                    const constract = await AsyncStorage.getItem("constract").then((result: any) => {
                        return JSON.parse(result)
                    });
                    const deleteItem = constract.filter((item: any) => item.id !== dataConstract.id);
                    await AsyncStorage.setItem('constract', JSON.stringify(deleteItem));
                    onBack()
                },
            }
        ]);
    }

    const onGeneratePdf = async () => {
        const date = new Date();
        try {
            const htmlContent = `
            <html>
            <body>

                <div style="margin: 0 auto; padding: 20px;"> 
                <h1 style="color: #333; text-align: center;">${dataConstract.name}</h1>
                <ul style="list-style-type: none; padding: 0;">
                    <li style="padding: 8; display: flex; flexDirection: column; gap: 8; borderBottom: 1px solid #666666">
                        <h2 style="font-size: 16px;font-weight: 600; color: #666666;">Tên hợp đồng: </h2>
                        <h2 style="font-size: 16px;font-weight: 600; color: #246bfd;">${dataConstract.name}</h2>
                    </li>
                    <li style="padding: 8; display: flex; flexDirection: column; gap: 8; borderBottom: 1px solid #666666">
                        <h2 style="font-size: 16px;font-weight: 600; color: #666666;">Tên khách hàng: </h2>
                        <h2 style="font-size: 16px;font-weight: 600; color: #246bfd;">${dataConstract.customer}</h2>
                    </li>
                    <li style="padding: 8; display: flex; flexDirection: column; gap: 8; borderBottom: 1px solid #666666">
                        <h2 style="font-size: 16px;font-weight: 600; color: #666666;">Giá trị hợp đồng: </h2>
                        <h2 style="font-size: 16px;font-weight: 600; color: #246bfd;">${dataConstract.price}</h2>
                    </li>
                    <li style="padding: 8; display: flex; flexDirection: column; gap: 8; borderBottom: 1px solid #666666">
                        <h2 style="font-size: 16px;font-weight: 600; color: #666666;">Điều khoản: </h2>
                        <h2 style="font-size: 16px;font-weight: 600; color: #246bfd;">${dataConstract.policy}</h2>
                    </li>
                    </li>
                    <li style="padding: 8; display: flex; flexDirection: column; gap: 8; borderBottom: 1px solid #666666">
                        <h2 style="font-size: 16px;font-weight: 600; color: #666666;">Trạng thái: </h2>
                        <h2 style="font-size: 16px;font-weight: 600; color: #246bfd;">${dataConstract.status}</h2>
                    </li>

                </ul>
                </div>
            
            </body>
        </html>`;
            const options = {
                html: htmlContent,
                fileName: `${dataConstract.name}-${date}`,
                directory: 'Documents',
            };

            Alert.alert('Xuất file PDF', 'Bạn có muốn xuất file?', [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý', onPress: async () => {
                        let file = await RNHTMLtoPDF.convert(options)
                        console.log(file.filePath);
                        if (file) {
                            ;
                        }
                    },
                }
            ]);
        } catch (error) {
            console.error('Error converting HTML to PDF:', error);
        }
    }

    return (
        <MainLayout
            title={"Chi tiết hợp đồng"}
            isBackButton={true}
            onGoBack={onBack}
        >
            <View style={styles.container}>

                <View style={[
                    styles.flexCommon,
                ]}>
                    <View>

                        <Text
                            style={styles.breadcumb}
                        >
                            Chi tiết hợp đồng
                        </Text>
                        <Pressable style={styles.btn} onPress={onGeneratePdf}>
                            <Text
                                style={styles.textBtnStyle}
                            >
                                Xuất file PDF
                            </Text>
                        </Pressable>
                    </View>

                    <Pressable style={styles.btn} onPress={onDeleteConstract}>
                        <Text
                            style={styles.textBtnStyle}
                        >
                            Xóa hợp đồng
                        </Text>
                    </Pressable>
                </View>
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
                        onPress={onUpdateConstractAsync}
                    >
                        <Text style={styles.textBtnStyle}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>
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
        borderRadius: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})