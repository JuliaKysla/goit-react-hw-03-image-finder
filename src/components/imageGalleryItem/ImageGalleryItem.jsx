import React from 'react'
import s from './ImageGalerryItem.module.css'

export class ImageGalleryItem extends React.Component {


    render(){
      const {id, webformatURL, tags} = this.props;
        return (
<li className={s.ImageGalleryItem} id={id}>
  <img className={s.image} src={webformatURL} alt={tags} />
</li>
            )
    }
   
}