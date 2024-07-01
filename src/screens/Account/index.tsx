import { useEffect, useState } from "react"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import AsyncStorage from "@react-native-async-storage/async-storage"

const tabs = [
    {
        title: 'Bookmarks',
        icon: <Entypo name='bookmark' size={18} />
    }
]
const Account = () => {
    const [selectedTab, setSelectedTab] = useState('')

    const getData = async() => {
        // let bookmark = await AsyncStorage.getItem('bookmark')
        // console.log(JSON.parse(bookmark))
    }

    useEffect(() => {
        getData()
    },[])



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginLeft: 16, marginTop: 24 }}>
                <TouchableOpacity>
                    <Entypo name='chevron-left' size={24} />
                </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', marginTop: 24, borderColor: 'black', borderWidth: 1, margin: 16, height: 160, borderRadius: 8, padding: 16 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#D3D3D3', width: 28, height: 28, borderRadius: 28 / 2 }}>
                        <AntDesign name='user' size={18} color={'black'} />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <Text>Get personalized feed on any device</Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#D3D3D3', width: 28, height: 28, borderRadius: 28 / 2 }}>
                        <Entypo name='bookmark' size={18} />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <Text>Access Bookmarks on any device</Text>
                    </View>
                </View>
                <View style={{ marginTop: 24 }}>
                    <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#D3D3D3', height: 48 }}>
                        <Text>Sign In Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginLeft: 16, marginTop:24 }}>
                {
                    tabs.map((v, i) => (
                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, width: '40%', paddingBottom: 6 }} key={i}>
                            {v.icon}
                            <View style={{ marginLeft: 8 }}>
                                <Text style={{ fontSize: 16 }}>{v.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
                <Text style={{ fontSize: 16 }}>No Bookmark</Text>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 16 }}>Tap on the title to bookmark a story</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}


export default Account