import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, Animated, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import RenderHtml, { RenderHTML } from 'react-native-render-html';
import GestureRecognizer from 'react-native-swipe-gestures';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const textStyle = {
    style: {
        fontSize: 16,
        lineHeight: 24,
    }
}

const News = ({ newsData, currentStoryIndex, translateY, navigation }: any) => {

    const handleSubmit = async (value:any) => {
        try {
            let bookmark = await AsyncStorage.getItem('bookmark');
            let bookmarkArray = bookmark ? JSON.parse(bookmark) : [];
    
            if (bookmarkArray.length > 0) {
                bookmarkArray.push(value);
            } else {
                bookmarkArray = [value];
            }
            await AsyncStorage.setItem('bookmark', JSON.stringify(bookmarkArray));
        } catch (error) {
            console.log('Error saving bookmark:', error);
        }
    };


    return (
        <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
            <GestureRecognizer onSwipeLeft={() => {
                navigation.navigate('NewsDetails', {
                    url: newsData?.news_url
                })
            }}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ height: '95%' }}>
                        {
                            newsData?.image_url ? (
                                <View style={{ position: 'relative', width: '100%', height: '40%' }}>

                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: newsData?.image_url }} />
                                    <View style={{
                                        position: 'absolute', 
                                        bottom: -12, 
                                        left: 20, 
                                        backgroundColor: 'white', 
                                        borderRadius:16,
                                        paddingTop:4,
                                        paddingBottom:4,
                                        paddingLeft: 16, 
                                        paddingRight: 16, 
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}>
                                        <Text style={{color:'grey', fontWeight:'bold'}}>Qwikto</Text>
                                    </View>
                                </View>
                            ) : (
                                <></>
                            )
                        }

                        <View style={{ margin: 20 }}>
                            <TouchableOpacity onPress={() => {
                                handleSubmit(newsData)
                            }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', lineHeight: 24 }}>{newsData?.title}</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 8, overflow: 'hidden', height: 200 }}>
                                <Text style={{fontSize:16, lineHeight:24}}>{newsData?.text}</Text>
                                {/* <RenderHTML contentWidth={400} source={{ html: newsData?.metadata?.description }} defaultTextProps={textStyle} /> */}
                            </View>

                        </View>
                    </View>
                    <View style={{ position: 'absolute', bottom: 40, height: '8%', width: '100%' }}>
                        {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 1, width: 28, height: 28, borderRadius: 28 / 2, marginRight: 16 }}>
                                <Entypo name="share" size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 1, width: 28, height: 28, borderRadius: 28 / 2 }}>
                                <MaterialIcons name="bookmark" size={20} />
                            </TouchableOpacity>
                        </View> */}
                        <ImageBackground source={{ uri: newsData?.image_url }} style={{ display: 'flex', justifyContent: 'start', height: '100%' }} imageStyle={{ width: '100%', height: '100%' }} blurRadius={60}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('NewsDetails', {
                                        url: newsData?.news_url
                                    })
                                }} style={{ marginLeft: 8, marginTop: 16 }}>
                                    <Text style={{ color: 'white' }}>For more information</Text>
                                    <Text style={{ color: 'white' }}>Read More</Text>
                                </TouchableOpacity>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 12, marginTop: 16 }}>
                                    {/* <TouchableOpacity style={{ marginRight: 12 }}>
                                        <Entypo name="share" color={'white'} size={20} />
                                    </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => {
                                        handleSubmit(newsData)
                                    }}>
                                        <Entypo name="bookmark" color={'white'} size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </GestureRecognizer>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gestureRecognizer: {
        flex: 1,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
    },
});

export default News