import { StyleProp, View, ViewStyle } from 'react-native'
import React,{ ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


type SafeScreenProps = {
    children: ReactNode
    style?: StyleProp<ViewStyle>
};

const SafeScreen = ({children, style } : SafeScreenProps) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={[{ paddingTop: insets.top, flex: 1 }, style]}>
      {children}
    </View>
  )
};

export default SafeScreen