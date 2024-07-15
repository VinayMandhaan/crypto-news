import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, Animated, StyleSheet, Image, ActivityIndicator, Dimensions, PanResponder } from 'react-native';
import News from '../../components/News';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Carousel from 'react-native-snap-carousel';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { getCryptoNews, getCryptoNotificationNews } from '../../redux/actions/crypto';
import { getFcmToken, registerListenerWithFCM } from '../../utils/notification';
import { setCryptoNews } from '../../redux/reducer/filterSlice';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height


const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const carouselRef = useRef()
    const selectedFilter = useSelector((state: RootState) => state.filter.selectedFilter)
    const cryptoNews = useSelector((state: RootState) => state.filter.cryptoNews)
    const notification = useSelector((state: RootState) => state.notification.notificationNews)
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const [newsData, setNewsData] = useState([]);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getFcmToken();
      }, []);
    
      useEffect(() => {
        const unsubscribe = registerListenerWithFCM();
        return unsubscribe;
      }, []);



    const handleGesture = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const handleStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX > 50) {
                Animated.timing(translateX, {
                    toValue: SCREEN_WIDTH,
                    duration: 100,
                    useNativeDriver: true
                }).start(() => {
                    navigation.navigate('Categories'); 
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
        try {
            if(notification) {
                dispatch(getCryptoNotificationNews(notification))
                carouselRef?.current?.snapToItem(0);
            } else {
                dispatch(getCryptoNews(null))
            }
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getData();
    }, [notification]);

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

    const getNewsData = () => {
        if(notification != null) {
            let newData = [notification, ...cryptoNews]
            return newData
        } else {
            return cryptoNews
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <PanGestureHandler
                    onGestureEvent={handleGesture}
                    onHandlerStateChange={handleStateChange}
                >
                    <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
                        <Carousel
                            ref={carouselRef}
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
