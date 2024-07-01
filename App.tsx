import { Provider } from "react-redux"
import Routes from "./src/routes"
import Home from "./src/screens/Home"
import { store } from "./src/redux/store"
import 'react-native-gesture-handler' 

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App