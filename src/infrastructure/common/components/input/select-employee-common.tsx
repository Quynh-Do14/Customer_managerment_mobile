/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { validateFields } from "../../../helper/helper";
import { MessageError } from '../controls/MessageError';
import { Picker } from '@react-native-picker/picker';
import Constants from '../../../../core/common/constant';

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute?: any,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    editable: boolean,
    dataList: Array<any>,
    labelNon: string,
}
const SelectEmployeeCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        validate,
        setValidate,
        submittedTime,
        editable,
        dataList,
        labelNon,
    } = props;
    const [value, setValue] = useState<string>("");
    const labelLower = label?.toLowerCase();
    const pickerRef = useRef<any>();

    const onBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
    }

    const onChange = (value: string) => {
        setValue(value || "");
        setData({
            [attribute]: value || ''
        });
        validateFields(false, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
    };

    useEffect(() => {
        setValue(dataAttribute || '');
    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);



    return (
        <KeyboardAvoidingView>
            <View
                style={styles.container}
            >
                <Text style={styles.labelStyle}>
                    {label}
                </Text>
                <View
                    style={
                        validate[attribute]?.isError ? styles.errorStyle : styles.noError
                    }
                >
                    <Picker
                        ref={pickerRef}
                        selectedValue={value}
                        onValueChange={onChange}
                        style={{
                            padding: 0,
                            color: "#246bfd",
                            fontFamily: "Roboto Regular",
                            fontWeight: "900",
                            marginBottom: 12,
                        }}
                        dropdownIconColor={"#246bfd"}
                        mode='dropdown'
                        placeholder='Loại khách hàng'
                    >
                        <Picker.Item enabled={false} color={"#1d86dc"} label={labelNon} value="" />
                        {
                            dataList.map((it, index) => {
                                return (
                                    <Picker.Item key={index} label={it.label} value={it.value} />
                                )
                            })
                        }
                    </Picker>
                </View>

                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </View>
        </KeyboardAvoidingView>
    )
};
export default SelectEmployeeCommon;
const styles = StyleSheet.create({
    container: {
        marginBottom: 12
    },
    fontStyle: {
        color: "#666666",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },

    labelStyle: {
        fontSize: 16,
        fontWeight: "semibold",
        color: "#666666",
        position: "absolute",
        top: -8
    },

    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#d0d0d0",
        marginBottom: 4,
    },
    btnStyle: {
        backgroundColor: "#D0FD3E",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    noError: {
        borderBottomColor: "#d0d0d0",
        borderBottomWidth: 1,
    },
    errorStyle: {
        borderBottomColor: "#f61a1a",
        borderBottomWidth: 1,
    }
})