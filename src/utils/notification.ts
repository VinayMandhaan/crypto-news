import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { navigationRef } from '../routes';

export const getFcmToken = async () => {
    let token = null;
    await checkApplicationPermission();
    await registerAppWithFCM();
    try {
        token = await messaging().getToken();
        console.log('getFcmToken-->', token);
        await storeTokenInFirestore(token);
    } catch (error) {
        console.log('getFcmToken Device Token error ', error);
    }
    return token;
};

async function storeTokenInFirestore(token) {
    try {
        const tokensCollection = firestore().collection('tokens');
        const querySnapshot = await tokensCollection.where('token', '==', token).get();
        
        if (querySnapshot.empty) {
            // Token does not exist, add it to Firestore
            await tokensCollection.add({ token });
            console.log('Token stored in Firestore:', token);
        } else {
            // Token already exists
            console.log('Token already exists in Firestore:', token);
        }
    } catch (error) {
        console.error('Error checking/storing token in Firestore:', error);
    }
}

export async function registerAppWithFCM() {
    console.log(
        'registerAppWithFCM status',
        messaging().isDeviceRegisteredForRemoteMessages,
    );
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging()
            .registerDeviceForRemoteMessages()
            .then(status => {
                console.log('registerDeviceForRemoteMessages status', status);
            })
            .catch(error => {
                console.log('registerDeviceForRemoteMessages error ', error);
            });
    }
}

export async function unRegisterAppWithFCM() {
    console.log(
        'unRegisterAppWithFCM status',
        messaging().isDeviceRegisteredForRemoteMessages,
    );

    if (messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging()
            .unregisterDeviceForRemoteMessages()
            .then(status => {
                console.log('unregisterDeviceForRemoteMessages status', status);
            })
            .catch(error => {
                console.log('unregisterDeviceForRemoteMessages error ', error);
            });
    }
    await messaging().deleteToken();
    console.log(
        'unRegisterAppWithFCM status',
        messaging().isDeviceRegisteredForRemoteMessages,
    );
}

async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('User has provisional notification permissions.');
    } else {
        console.log('User has notification permissions disabled');
    }
}

export function registerListenerWithFCM() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('onMessage Received : ', JSON.stringify(remoteMessage));
        if (
            remoteMessage?.notification?.title &&
            remoteMessage?.notification?.body
        ) {
            onDisplayNotification(
                remoteMessage.notification?.title,
                remoteMessage.notification?.body,
                remoteMessage?.data,
            );
        }
    });
    notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
            case EventType.DISMISSED:
                console.log('User dismissed notification', detail.notification);
                break;
            case EventType.PRESS:
                console.log('User pressed notification', detail.notification?.data.title);
                const newsData = {
                    title:detail.notification?.data.title,
                    image_url:detail.notification?.data?.image_url,
                    text:detail.notification?.data?.text,
                    news_url:detail.notification?.data?.news_url
                }
                navigationRef.current.navigate('BookmarkDetails', {
                    newsData:newsData
                })
                // if (detail?.notification?.data?.clickAction) {
                //   onNotificationClickActionHandling(
                //     detail.notification.data.clickAction
                //   );
                // }
                break;
        }
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
        console.log(
            'onNotificationOpenedApp Received',
            JSON.stringify(remoteMessage),
        );
        // if (remoteMessage?.data?.clickAction) {
        //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
        // }
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    return unsubscribe;
}

async function onDisplayNotification(title, body, data) {
    console.log(data,'Notification from new')
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: title,
        body: body,
        data: data,
        android: {
            channelId,
            pressAction: {
                id: 'default',
            },
        },
    });
}
