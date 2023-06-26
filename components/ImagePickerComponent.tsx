import * as ImagePicker from "expo-image-picker";
import { useState } from "react";


function ImagePickerComponent(props) {
    const [image, setImage] = useState(null);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const getPermission = async () => {
        if (!status?.granted) {
            const permission = await requestPermission();
            if(!permission.granted) {
                return null;
            }
        }
        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing: true, //선택 후 편집하기 위한 ui표시 여부
                aspect: [4,3], //종횡비
                quality: 1, // 압축 비율
            });
            console.log(result);
            if(!result.canceled) {
                setImage(result.assets[0].uri);
            } else { return null;}
        };
        pickImage();
    }  
}

export default ImagePickerComponent;