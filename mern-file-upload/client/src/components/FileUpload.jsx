/* eslint-disable no-unused-vars */
import React , {Fragment , useState} from 'react'
import axios from 'axios';
 const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    
    const onChanges = (e) => {
          // prevent default form submission
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
          setFilename(e.target.files[0].name);
    } ;

    const onSubmit = async (e) => { 
        e.preventDefault();
        // code to send file to server
        const formData = new FormData();
        formData.append('file', file);
        // console.log(formData);
        try {

           const res = await axios.post("http://localhost:5000/upload", formData,{
             headers: {
                'Content-Type':'multipart/form-data'
             }
           }) 

           const {fileName , filePath} = res.data
           setUploadedFile({fileName , filePath})
           console.log(res);

        } catch (err) {
            // if (err.response.status === 500) {
            //     console.log('There was a problem with the server');
            //     setMessage('There was a problem with the server');
            //   } else {
            //     console.log(err.response.data.msg);
            //     setMessage(err.response.data.msg);
            //   }
              //setUploadPercentage(0)
              // setErrorMessage(err.response.data.msg);
              // setUploadStatus('failed');
              // setError(true);
              console.log(err);
        }
    }
  
  return (
    <Fragment>
           <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChanges}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

       

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
    </Fragment>
  )
}
export default FileUpload