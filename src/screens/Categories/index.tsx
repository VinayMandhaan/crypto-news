import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Animated, Dimensions } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from "react-redux"
import { setSelectedFilter } from "../../redux/reducer/filterSlice"
import { RootState } from "../../redux/store"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import GestureRecognizer from "react-native-swipe-gestures"
import { getCryptoNews } from "../../redux/actions/crypto"


const data = [
    {
        id: 1,
        title: 'Rising',
        icon: <MaterialIcons name="feed" size={32} color={'black'} />
    },
    {
        id: 2,
        title: 'Hot',
        icon: <MaterialIcons name="star" size={32} color={'black'} />
    },
    {
        id: 3,
        title: 'Bearish',
        icon: <MaterialIcons name="star" size={32} color={'black'} />
    },
    {
        id: 4,
        title: 'Important',
        icon: <MaterialIcons name="bookmark" size={32} color={'black'} />
    },
    {
        id: 5,
        title: 'Saved',
        icon: <MaterialIcons name="bookmark" size={32} color={'black'} />
    },
    {
        id: 6,
        title: 'Bookmark',
        icon: <MaterialIcons name="bookmark" size={32} color={'black'} />
    },
]

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const Categories = ({ navigation }) => {
    const dispatch = useDispatch()
    const newsData = useSelector((state: RootState) => state.filter.cryptoNews)
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const [cryptoPrice, setCryptoPrice] = useState()
    const [trendingData, setTrendingData] = useState()
    const [cryptoData, setCryptoData] = useState()

    const handleGesture = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const handleStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            console.log(nativeEvent.translationX);
            if (nativeEvent.translationX < -10) {
                Animated.timing(translateX, {
                    toValue: SCREEN_WIDTH,
                    duration: 100,
                    useNativeDriver: true,
                }).start(() => {
                    navigation.navigate("Home"); // Replace 'Home' with your desired screen name
                    setTimeout(() => {
                        translateX.setValue(0);
                    }, 1000);
                });
            } else {
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    useEffect(() => {
        getData()
        getTrending()
        getCryptoData()
    }, [])

    const getData = async () => {
        await axios({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr',
            headers: {
                accept: 'application/json',
                'x-cg-api-key': 'CG-xqtYZhVZ9DZ4D43Gc4MRXYpj'
            }
        }).then((res) => {
            setCryptoPrice(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getTrending = async() => {
        await axios({
            method:'GET',
            url:'https://cryptonews-api.com/api/v1/trending-headlines?&page=1&token=pnudnubwjqdofl14enbotqh6by28lc3g4mz1tyuo',
        }).then((res) => {
            setTrendingData(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const renderData = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                dispatch(getCryptoNews(item?.ticker))
                navigation.navigate('Home')
            }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 100 }}>
                <View style={{display:'flex', alignItems:'center', justifyContent:'center', width:48, height:48, borderRadius:48/2, backgroundColor:'#ffcb37'}}>
                    <Text>{item.ticker}</Text>
                </View>
                <View style={{ marginTop: 12 }}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const getCryptoData = async() => {
        await axios({
            method:'GET',
            url:'https://cryptonews-api.com/api/v1/top-mention?&date=last7days&token=pnudnubwjqdofl14enbotqh6by28lc3g4mz1tyuo',
        }).then((res) => {
            setCryptoData(res.data.data.all)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginLeft: 8, marginRight: 8 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Discover</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Home')
                    }}>
                        <Text>Feed</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 12, marginLeft: 8, marginRight: 8 }}>
                    <TextInput placeholder="Search for News, Topics" style={{ backgroundColor: '#E8E8E8', width: '100%', height: 48, textAlign: 'center', borderRadius: 4, fontWeight: 'bold' }} />
                </View> */}
                <View>
                    <FlatList
                        data={cryptoPrice?.slice(0, 10)}
                        style={{ paddingLeft: 16 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item }) => (
                            <View style={{
                                display: 'flex',
                                marginTop: 16,
                                marginRight: 8,
                                marginBottom: 16,
                                paddingLeft: 16,
                                paddingRight: 16,
                                backgroundColor: 'white',
                                borderRadius: 8,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                padding: 8
                            }}>
                                <View style={{ display: 'flex' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ width: 20, height: 20, objectFit: 'contain' }} source={{ uri: item.image }} />
                                        <Text style={{ marginLeft: 8, fontSize: 14 }}>{item.name}({item?.symbol?.toUpperCase()})</Text>
                                    </View>
                                    <View style={{ marginLeft: 4, marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>${item?.current_price?.toLocaleString()}</Text>
                                    </View>
                                    <View style={{ marginLeft: 4, marginTop: 4 }}>
                                        <Text style={{ color: item?.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                                            {item?.price_change_percentage_24h?.toFixed(2)}%
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />

                </View>
                <View style={{ marginTop: 4, marginLeft: 8, marginBottom: 24 }}>
                    <FlatList showsHorizontalScrollIndicator={false} horizontal data={cryptoData?.slice(0,8)} renderItem={renderData} />
                </View>
                <GestureRecognizer onSwipeLeft={() => {
                    navigation.navigate('Home')
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 8, marginTop: 24, marginRight: 8 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Notifications</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Home')
                        }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>VIEW ALL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 8, marginTop: 16 }}>
                        {
                            newsData?.slice(0, 3)?.map((v, i) => (
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} key={i}>
                                    <View style={{ width: '70%' }}>
                                        <Text style={{fontSize:14}}>{v?.title}</Text>
                                    </View>
                                    <View style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                                        <Image style={{ width: 80, height: 80, objectFit: 'contain' }} source={{ uri: v?.image_url}} />

                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 8, marginTop: 24, marginRight: 8 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trending</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Trending', {
                                trendingData:trendingData
                            })
                        }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>VIEW ALL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginLeft:8, marginTop:16}}>
                        {
                            trendingData && trendingData?.slice(0,6)?.map((v,i) => (
                                <View style={{marginBottom:12, borderBottomColor:'#d3d3d3', borderBottomWidth:1, paddingBottom:8}} key={i}>
                                    <Text style={{fontSize:14, fontWeight:'bold'}}>{v.headline}</Text>
                                </View>
                            ))
                        }
                    </View>
                </GestureRecognizer>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Categories