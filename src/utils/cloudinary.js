import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        //After file has been uploaded successfully
        console.log('File is uploaded on cloudinary.'+
            '\n Files public url is : '+
            response.url
        );
        return response;
    } catch (error) {
        /*if due to any reason the file is not uploaded to cloud,
        we need to remove this file which is present on the local server
        */
       fs.unlinkSync(localFilePath);//removes the locally saved temporary file as the upload operaton was failed
    }
}

export{uploadOnCloudinary}