import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { constract, customer } from '../../../core/common/data';

const MainLayout = ({ onGoBack, isBackButton = false, title, logout = false, ...props }: any) => {
    // useEffect(() => {
    //     AsyncStorage.setItem("customer", JSON.stringify(customer))
    //     AsyncStorage.setItem("constract", JSON.stringify(constract))
    // }, [customer, constract])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.flex1} >
                    <TouchableOpacity
                        onPress={onGoBack}
                    >
                        {isBackButton &&
                            <View  >
                                {
                                    logout
                                        ?
                                        <Image source={require("../../../../assets/images/logout.png")} />
                                        :
                                        <Image source={require("../../../../assets/images/arrowOutline.png")} />
                                }
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.flex3}>
                    <Text style={styles.textTitle}>{title}</Text>
                </View>
                <View style={styles.flex1}>
                </View>
            </View>
            <View style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // marginVertical: 20
                paddingHorizontal: 8
            }}>
                {props.children}
            </View>
        </View >
    )
}
export default MainLayout

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 20,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 12
    },
    content: {
        flex: 1
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    flex3: {
        flex: 3
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    textTitle: {
        color: "#1e1e1e",
        textAlign: "center",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 20,
    },
})