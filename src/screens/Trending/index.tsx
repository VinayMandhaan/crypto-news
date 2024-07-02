import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'


const Trending = ({ navigation, route }) => {
    const { trendingData } = route.params
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }}>
                    <Entypo name="chevron-left" size={20} />
                </TouchableOpacity>
                <View style={{ marginLeft: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trending</Text>

                </View>
            </View>
            <View style={{ margin: 16, marginTop: 24 }}>
                <FlatList
                    data={trendingData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 8 }}>
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <View>
                                    {
                                        item.sentiment == 'Positive' ? (
                                            <AntDesign color={'green'} name="like1" />
                                        ) : (
                                            <AntDesign color={'red'} name="dislike1" />
                                        )
                                    }
                                </View>
                                <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginLeft:8, width:'90%'}}>
                                    <Text style={{ fontSize: 14 }}>{item.headline} - <Text style={{fontWeight:'bold'}}>{item.tickers[0]}</Text></Text>
                                </View>
                            </View>

                        </View>
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

export default Trending