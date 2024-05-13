import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import DialogNotificationCommon from '../../infrastructure/common/components/dialog/dialogNotification';
import { account } from '../../core/common/data';
import Constants from '../../core/common/constant';
import LoginTab from './login';
import RegisterTab from './register';

const LoginScreen = () => {
    const [tabSelect, setTabSelect] = useState(1)

    const onChangeTab = (value: number) => {
        setTabSelect(value)
    }
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
                <View
                    style={[
                        styles.flexRow,
                        {
                            gap: 30,
                            paddingHorizontal: 20
                        }
                    ]}
                >
                    {Constants.AuthTab.List.map((it, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onChangeTab(it.value)}
                            style={
                                tabSelect == it.value
                                    ?
                                    styles.activeTab
                                    :
                                    null
                            }
                        >
                            <Text
                                style={[
                                    styles.fontStyle,
                                    { fontSize: 14 }
                                ]}
                            >
                                {it.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {
                    tabSelect == 1
                        ?
                        <LoginTab />
                        :
                        <RegisterTab
                            setTabSelect={setTabSelect}
                        />

                }

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