// import React from 'react'
// import { useRecoilValue } from 'recoil';
// import { language } from '../common/data';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LanguageState } from '../atoms/language/languageState';
// const useTranslate = async () => {
//     const translation = useRecoilValue(LanguageState);
//     const storegrage = await AsyncStorage.getItem("language").then((result) => {
//         return result
//     })
//     const translate = (key: string) => {
//         const data = storegrage ? language.[storegrage] : language?.["vi"];
//         const filteredKeys = Object.keys(data).filter(it => {
//             return it
//         }

//         );
//         const condition = filteredKeys.filter(it => it == key)
//         if (condition.length == 0) {
//             return key
//         }
//         if (typeof (translation) === "object") {
//             if (storegrage) {
//                 return language.[storegrage]?.[key];
//             }
//             else {
//                 return language.vi.[key];
//             }
//         }
//         if (translation) {
//             return language?.[translation]?.[key];
//         }
//         return key
//     };

//     return { translate };
// }

// export default useTranslate;


