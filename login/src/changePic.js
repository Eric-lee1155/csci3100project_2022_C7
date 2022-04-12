import ImageUploading from "react-images-uploading";
import React from "react";
import styles from './index.module.css';

const ChangePic = () =>{
    
    const [images, setImages] = React.useState([]);
    // const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
    // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(images);
    
        window.location.assign("./modify")

        fetch("http://119.246.79.200:8080/login", {
        method:'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'image' : images }
        )
        })
        .then (response => response.json())
        // .then(data => data);
        .then(data => setImages(data));


    }


    return (
    <>
    <img src={process.env.PUBLIC_URL + '/weegee.webp'} alt={"pic"} />
    <ImageUploading
        
        value={images}
        onChange={onChange}
        
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          //onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <button className={styles.ChangePic_butn} onClick={handleSubmit}>Change Profile Picture</button>
    </>
    )
}

export default ChangePic;