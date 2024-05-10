import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import DialogNotificationCommon from '../../infrastructure/common/components/dialog/dialogNotification';
import { account } from '../../core/common/data';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [isDialogNoti, setIsDialogNoti] = useState<boolean>(false);
    const [focusUsername, setFocusUsername] = useState<boolean>(false);
    const [focusPassword, setFocusPassword] = useState<boolean>(false);

    const onCloseDialogNoti = () => {
        setIsDialogNoti(false)
    }
    const onLoginAsync = async () => {
        if (username && password) {
            account.map((it) => {
                if (it.username == username && it.password == password) {
                    navigation.navigate(
                        "Navbar",
                        {},
                    );
                    setUsername("");
                    setPassword("");
                }
                else {
                    setIsDialogNoti(true)
                }
            })
        }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={[
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }
                ]}>
                    <Image
                        source={require("../../../assets/images/loginBg.jpg")}
                        resizeMode={"contain"}
                        style={{ width: 400, height: 180 }}
                    />
                </View>
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
                            onPress={onLoginAsync}
                        >
                            <Text
                                style={[
                                    styles.fontStyle,
                                    {
                                        fontSize: 16,
                                        color: "#FFFFFF",
                                    }
                                ]}
                            > Đăng nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DialogNotificationCommon
                    visible={isDialogNoti}
                    onConfirm={onCloseDialogNoti}
                    message={"Tài khoản đăng nhập không chính xác"}
                />
            </ScrollView>
        </View >
    )
}

export default LoginScreen
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