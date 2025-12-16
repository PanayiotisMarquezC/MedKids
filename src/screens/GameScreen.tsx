import { useRef } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function GameScreen() {
  const ref = useRef<WebView>(null);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={ref}
        style={{ flex: 1 }}
        source={{ uri: 'https://cerino-games.eu/game.html' }}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        onMessage={(e) => {
          try { const data = JSON.parse(e.nativeEvent.data); console.log('WebView message:', data); }
          catch { /* ignore non-JSON */ }
        }}
      />
      <Text style={{ position: 'absolute', left: 8, top: 8, backgroundColor: '#FFF8', padding: 6, borderRadius: 8 }}>
        Loading game…
      </Text>
    </View>
  );
}
