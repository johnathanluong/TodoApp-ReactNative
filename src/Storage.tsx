import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch(e) {
        console.log(e);
    }
}

export default {
    storeData
};