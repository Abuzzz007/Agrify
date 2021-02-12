import { useState } from "react"
//Components
import Loader from "../../components/Loaders/UploadLoader";
const tmImage = require("@teachablemachine/image")


function Cotton() {
    const [image, setImage] = useState({ url: "", result: "" })
    const [isLoading,setIsLoading]=useState(false)
    
    const imgHandler = (e) => {
        setImage({ url: URL.createObjectURL(e.target.files[0]), result: "" })
    }

    const Predict = async () => {
        setIsLoading(true)

        const URL = "https://teachablemachine.withgoogle.com/models/clEJGWrhx/"
        
        let model;

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);

        async function predict() {
            let img= document.getElementById("test-pic")
            const prediction = await model.predict(img);

            let sorteddata = prediction.sort((a, b) => b.probability - a.probability)
            setImage({ ...image, result: sorteddata[0].className + " " + (sorteddata[0].probability * 100).toFixed(5) + "%" })
            setIsLoading(false)
            

        }
        predict()
    }

    return (
        <>
     {isLoading ? <Loader /> : ""}
    <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-10">
            <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">Cotton</div>
            </div>
            <div className="flex flex-wrap pt-24 sm:pt-16 z-0">
                <div className="ml-5 text-2xl w-full px-4 pt-8 max-w-md mt-5">
                    Please upload image of the crop
                </div>
                <div className="mx-auto mt-5 w-full">
                    {image.url ? <>
                        <img src={image.url} alt="test-pic" id="test-pic" className="max-w-md mx-auto" style={{width:500,maxWidth:"90vw"}}/>
                        <div className="w-full text-center">
                            {!isLoading?
                        <button className="bg-gray-600 text-white hover:bg-gray-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4" onClick={()=>Predict()}>Predict</button>:""}</div>
                    </> : <>
                <label className="block" htmlFor="img-input"><div className="mx-auto p-4 w-40 text-center mt-5 bg-green-400 hover:bg-green-500 rounded shadow hover:shadow-lg">
                    Upload Image
                    </div></label>

                    <input id="img-input" type="file" className="hidden" onChange={imgHandler}/>
                    
                        </>}
                </div>
                {image.result ?
                    <div id="">
                        {image.result}
                    </div> : ""}
                
      </div>
      </>
            
    )
}

export default Cotton