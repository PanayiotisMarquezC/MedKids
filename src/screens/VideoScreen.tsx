import { WebView } from 'react-native-webview';
export default function VideoScreen() {
  return <WebView style={{ flex: 1 }} source={{ uri: 'https://vimeo.com/1029600681' }} allowsInlineMediaPlayback />;
}
