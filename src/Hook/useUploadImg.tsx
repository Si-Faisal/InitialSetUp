
import { AxiosInstance, AxiosResponse } from 'axios';
import instance from "../Redux/Axios/axiosInstance"


interface MyResponse {
    success: boolean;
    data?: {
      display_url?: string;
      // Other properties if present in your response
    };
    // Other properties if present in your response
  }
  

const useUploadImg =async  (imageFile: File)=>{

  const formData = new FormData();
  formData.append('image', imageFile);

    try {
        const res =await  instance.post("routes/upload",formData);
        console.log(res);
        if (res && res.data && res.data.success && res.data.data && res.data.data.display_url) {
          const imgURL: string = res.data.data.display_url;
          return imgURL;
        } else {
          // Handle unexpected response structure or missing data
          throw new Error('Invalid response or missing image URL');
        }
    } catch (error) {
        console.log(error)
    }
}

export default useUploadImg;