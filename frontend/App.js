import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ChatStackNavigator from './src/navigations/Navigator';
import { ChatProvider } from './src/context/chatContext';
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold
} from '@expo-google-fonts/montserrat';



const App = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold
  });

  return(
    <ChatProvider>
    <NavigationContainer>
      <ChatStackNavigator/>
    </NavigationContainer>
    </ChatProvider>
  )
}
export default App;
