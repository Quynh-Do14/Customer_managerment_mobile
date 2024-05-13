import React from 'react'
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import DialogNotificationCommon from '../../infrastructure/common/components/dialog/dialogNotification';
import { account } from '../../core/common/data';
import Constants from '../../core/common/constant';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    setTabSelect: Function
}
const RegisterTab = ({ setTabSelect }: Props) => {
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [isDialogNoti, setIsDialogNoti] = useState<boolean>(false);
    const navigation = useNavigation<any>()
    const onCloseDialogNoti = () => {
        setIsDialogNoti(false)
    }
    const onRegisterAsync = async () => {
        const account = await AsyncStorage.getItem("account").then((result: any) => {
            return JSON.parse(result)
        });
        const initial = []

        const data = {
            name: name,
            username: username,
            address: address,
            password: password,
        }

        if (account) {
            account?.push(
                data
            )
            await AsyncStorage.setItem("account", JSON.stringify(account))
            setTabSelect(1);
        }
        else {
            initial?.push(
                data
            )
            console.log("initial", initial);
            await AsyncStorage.setItem("account", JSON.stringify(initial))
            setTabSelect(1);
        }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View>
            <View style={[
                {
                    height: '60%',
                    paddingVertical: 30,
                    paddingHorizontal: 30,
                }
            ]}>
                <View style={[
                    styles.flexCol,
                    {
                        gap: 20,
                        justifyContent: "space-between",
                        height: "100%"
                    }
                ]}>
                    <KeyboardAvoidingView>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20
                            }}
                        >
                            <View>
                                <Text
                                    style={styles.label}
                                >
                                    Tên đăng nhập
                                </Text>
                                <TextInput
                                    placeholder='Nhập tên đăng nhập'
                                    placeholderTextColor={"#1e1e1e70"}
                                    onChangeText={(e) => setUsername(e)}
                                    value={username}
                                    style={[
                                        styles.fontStyle,
                                        styles.inputStyle,
                                    ]} />
                            </View>

                            <View>
                                <Text
                                    style={styles.label}
                                >
                                    Họ và tên
                                </Text>
                                <TextInput
                                    placeholder='Nhập họ và tên'
                                    placeholderTextColor={"#1e1e1e70"}
                                    onChangeText={(e) => setName(e)}
                                    value={name}
                                    style={[
                                        styles.fontStyle,
                                        styles.inputStyle,
                                    ]} />
                            </View>

                            <View>
                                <Text
                                    style={styles.label}
                                >
                                    Địa chỉ
                                </Text>
                                <TextInput
                                    placeholder='Nhập địa chỉ'
                                    placeholderTextColor={"#1e1e1e70"}
                                    onChangeText={(e) => setAddress(e)}
                                    value={address}
                                    style={[
                                        styles.fontStyle,
                                        styles.inputStyle,
                                    ]} />
                            </View>

                            <View>
                                <Text
                                    style={styles.label}
                                >
                                    Mật khẩu
                                </Text>
                                <TextInput
                                    placeholder='Nhập mật khẩu'
                                    placeholderTextColor={"#1e1e1e70"}
                                    onChangeText={(e) => setPassword(e)}
                                    value={password}
                                    style={[
                                        styles.fontStyle,
                                        styles.inputStyle
                                    ]}
                                    secureTextEntry={showPassword}
                                />
                                <Pressable onPress={toggleShowPassword} style={styles.icon}>
                                    {
                                        showPassword
                                            ?
                                            <Image source={require("../../../assets/images/hide.png")} />
                                            :
                                            <Image source={require("../../../assets/images/open.png")} />
                                    }
                                </Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        style={[
                            styles.btnStyle
                        ]}
                        onPress={onRegisterAsync}
                    >
                        <Text
                            style={[
                                styles.fontStyle,
                                {
                                    fontSize: 16,
                                    color: "#FFFFFF",
                                }
                            ]}
                        > Đăng kí
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DialogNotificationCommon
                visible={isDialogNoti}
                onConfirm={onCloseDialogNoti}
                message={"Tài khoản đăng nhập không chính xác"}
            />
        </View>
    )
}

export default RegisterTab
const styles = StyleSheet.create({
    container: {
        // display: "flex",
        // flexDirection: "column",
        backgroundColor: "#FFFFFF",
        paddingTop: 24,
        // height: "100%"
        flex: 1
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    section: {
        height: '50%',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    fontStyle: {
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },
    activeTab: {
        paddingBottom: 3,
        borderBottomWidth: 2,
        borderBottomColor: "#246bfd"
    },
    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#DADADA",
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
    icon: {
        padding: 8,
        position: "absolute",
        right: 0,
        top: 4
    },
    label: {
        position: "absolute",
        fontSize: 16,
        color: "#777A84",
        fontWeight: "semibold",
        top: -12,
        left: 4
    },
})