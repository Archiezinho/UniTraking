import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { storage } from "./firebaseConfig.js";
import { createId } from '@paralleldrive/cuid2';

export const uploadFile = async (file,path) => {
    if(!file) return;
    
    const fileExtension = file.name.split('.')[file.name.split('.').length - 1];
    const fileName = `${createId()}.${fileExtension}`;
    const storageRef = ref(storage, `/files/${fileName}`)
    //const storageRef = ref(storage, `/files/path/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) =>  {uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
 
            // update progress
            console.log(percent);
        },
        (err) => {
            console.log(err)
            reject(err)
        },
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                resolve(url);
            }).catch(
                (err) => {
                    console.log(err)
                    reject(err)
                }
            )
        }
    )})
}