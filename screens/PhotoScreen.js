import PhotoList from "./ImageFetchingFromBackend/PhotoList";
import UploadPhoto from "./ImageFetchingFromBackend/UploadPhoto";
import {View} from 'react-native'
function PhotoScreen(){
return (
  <View>
  <UploadPhoto/>
  <PhotoList/>
  
  </View>
)
}

export default PhotoScreen;