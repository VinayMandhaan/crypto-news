import { SafeAreaView, View } from "react-native"
import { WebView } from 'react-native-webview';



const NewsDetails = ({ navigation, route }) => {
    const {url} = route.params

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView source={{ uri: url }} style={{ flex: 1 }} />
        </SafeAreaView>
    )
}

export default NewsDetails