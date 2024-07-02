import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, Animated, StyleSheet, Image, ActivityIndicator, Dimensions, PanResponder } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import RenderHtml, { RenderHTML } from 'react-native-render-html';
import News from '../../components/News';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Carousel from 'react-native-snap-carousel';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { setData } from '../../redux/reducer/filterSlice';
import Logo from '../../assets/images/loog.png'
import { getCryptoNews } from '../../redux/actions/crypto';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height


const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const selectedFilter = useSelector((state: RootState) => state.filter.selectedFilter)
    const cryptoNews = useSelector((state:RootState) => state.filter.cryptoNews)
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const [newsData, setNewsData] = useState([]);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [loading, setLoading] = useState(false)



    const handleGesture = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const handleStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX > 50) { // Threshold for left swipe
                Animated.timing(translateX, {
                    toValue: SCREEN_WIDTH,
                    duration: 100,
                    useNativeDriver: true
                }).start(() => {
                    navigation.navigate('Categories'); // Replace 'OtherScreen' with your desired screen name
                    setTimeout(() => {
                        translateX.setValue(0);

                    }, 1000)

                });
            } else {
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true
                }).start();
            }
        }
    };

    const getData = async () => {
        // try {
        //     setLoading(true)
        //     const response = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=91affd44d15e1e7a075bf7f08781b0c96a4d4578&metadata=true&filter=${selectedFilter}`);
        //     const newsResults = response.data.results;
        //     dispatch(setData(response.data.results))
        //     const prefetchPromises = newsResults.map((item: any) => {
        //         if (item.metadata?.image) {
        //             return Image.prefetch(item.metadata?.image).catch(error => {
        //                 return Promise.resolve();
        //             });
        //         }
        //         return Promise.resolve();
        //     });
        //     await Promise.all(prefetchPromises);
        //     setNewsData(newsResults);
        //     setLoading(false)

        // } catch (err) {
        //     console.log(err);
        //     setLoading(false)
        // }
        try{
            dispatch(getCryptoNews(null))
            // const prefetchPromises = newsResults.map((item: any) => {
            //     if (item.image_url) {
            //         return Image.prefetch(item.image_url).catch(error => {
            //             return Promise.resolve();
            //         });
            //     }
            //     return Promise.resolve();
            // });
            // await Promise.all(prefetchPromises);
            // setNewsData(newsResults);
        }catch(err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onSwipeUp = () => {
        Animated.timing(translateY, {
            toValue: -500,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % newsData.length);
            translateY.setValue(500);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }).start();
        });
    };

    const onSwipeDown = () => {
        Animated.timing(translateY, {
            toValue: 500,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
            translateY.setValue(-500);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    };

    const onSwipeRight = () => {
        navigation.navigate('Categories')
    }

    const renderItem = ({ item }) => {
        return (
            <News newsData={item} currentStoryIndex={currentStoryIndex} translateY={translateY} navigation={navigation} />
        )
    }


    // if(loading) {
    //     return (
    //         <View style={{flex:1, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
    //             <Image style={{width:120, height:120, objectFit:'contain'}} source={require('../../assets/images/logo.png')}/>
    //         </View>
    //     )
    // }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <PanGestureHandler
                    onGestureEvent={handleGesture}
                    onHandlerStateChange={handleStateChange}
                >
                    <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
                        <Carousel
                            data={cryptoNews}
                            layout='stack'
                            containerCustomStyle={{ flex: 1 }}
                            renderItem={renderItem}
                            sliderWidth={SCREEN_WIDTH}
                            sliderHeight={SCREEN_HEIGHT}
                            itemWidth={SCREEN_WIDTH}
                            itemHeight={SCREEN_HEIGHT}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            vertical={true}
                            swipeThreshold={10}
                            //   onEndReached={this.handleEndReached}
                            nestedScrollEnabled
                            windowSize={5}
                            onSnapToItem={(index) => {
                                setCurrentStoryIndex(index)
                            }}
                        />
                    </Animated.View>
                </PanGestureHandler>
            </SafeAreaView>
        </GestureHandlerRootView>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gestureRecognizer: {
        flex: 1,
    },
});

export default Home;


{/* <GestureRecognizer style={styles.gestureRecognizer} onSwipeUp={onSwipeUp} onSwipeDown={onSwipeDown} onSwipeRight={onSwipeRight}>
                {newsData.length > 0 && (
                    <News newsData={newsData} currentStoryIndex={currentStoryIndex} translateY={translateY} />
                )}
            </GestureRecognizer> */}
