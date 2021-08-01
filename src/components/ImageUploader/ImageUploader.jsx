import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core'


function ImageUploader(props) {
    const dispatch = useDispatch();
    const [file, setFile] = useState('')

    const imageType = props.imageType

    async function postImage(image) {
        const formData = new FormData()
        formData.append("image", image)

        const result = await axios.post('/api/image/s3', formData, { headers: {'Content-Type': 'multipart/formData'}})

        console.log(result);

        return result.data
    }

    // change handler for file
    const fileSelected = event => {
        console.log(event.target.files[0]);
        const file = event.target.files[0]
            setFile(file)
        }

    // awaits the post image function above, validates an image has been selected
    const handleSubmit = async event => {
        event.preventDefault()
    
        if (file === '') {
          return alert('select an image')
        }
        
        // triggers postImage function with the file state variable
        const result = await postImage(file)

        // logs the s3 info to show a succesful post, possible render somewhere if we pass down a callback
        console.log(result);
        
        dispatch({
            type: 'POST_IMAGE_TO_DB',
            payload: result,
            imageType: imageType
        })

        props.submitFunction()
      }





    return (
        <form onSubmit={handleSubmit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>

        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    )
}

export default ImageUploader