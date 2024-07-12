import { useCallback, useEffect, useState } from "react"
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"

const tabs = [
    {
        title: 'Bookmarks',
        icon: <Entypo name='bookmark' size={18} />
    }
]
const Account = ({navigation}) => {
    const [selectedTab, setSelectedTab] = useState('')
    const [bookmark, setBookmark] = useState()

    const getData = async () => {
        let bookmarkData = await AsyncStorage.getItem('bookmark')
        setBookmark(bookmarkData ? JSON.parse(bookmarkData) : [])
    }

    useFocusEffect(
        useCallback(() => {
            getData()
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ display:'flex', flexDirection:'row', alignItems:'center', marginLeft: 16, marginTop: 24 }}>
                <TouchableOpacity>
                    <Entypo name='chevron-left' size={24} />
                </TouchableOpacity>
                <View style={{marginLeft:24}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Bookmarks</Text>
                </View>
            </View>
            {/* <View style={{ display: 'flex', marginTop: 24, borderColor: '#d3d3d3', borderWidth: 1, margin: 16, height: 160, borderRadius: 8, padding: 16 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffcb37', width: 28, height: 28, borderRadius: 28 / 2 }}>
                        <AntDesign name='user' size={18} color={'black'} />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <Text>Get personalized feed on any device</Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffcb37', width: 28, height: 28, borderRadius: 28 / 2 }}>
                        <Entypo name='bookmark' size={18} />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <Text>Access Bookmarks on any device</Text>
                    </View>
                </View>
                <View style={{ marginTop: 24 }}>
                    <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffcb37', height: 48 }}>
                        <Text style={{fontWeight:'bold', fontSize:14}}>Sign In Now</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
            {/* <View style={{ marginLeft: 16, marginTop: 24 }}>
                {
                    tabs.map((v, i) => (
                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ffcb37', borderBottomWidth: 1, width: '40%', paddingBottom: 6 }} key={i}>
                            {v.icon}
                            <View style={{ marginLeft: 8 }}>
                                <Text style={{ fontSize: 16 }}>{v.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View> */}
            <ScrollView>
            <View style={{ display: 'flex', marginTop: 8 }}>
                {
                    bookmark?.length > 0 ? (
                        <View style={{ margin: 16 }}>
                            {
                                bookmark?.map((v, i) => (
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('BookmarkDetails', {
                                            newsData:v
                                        })
                                    }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#d3d3d3' }} key={i}>
                                        <View style={{ width: '30%' }}>
                                            <Image style={{ width: 100, height: 100, objectFit: 'contain' }} source={{ uri: v?.image_url }} />
                                        </View>
                                        <View style={{ width: '70%' }}>
                                            <Text>{v.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    ) : (
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
                            <Text style={{ fontSize: 16 }}>No Bookmark</Text>
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ fontSize: 16 }}>Tap on the title to bookmark a story</Text>
                            </View>
                        </View>
                    )
                }
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Account