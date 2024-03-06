import React from 'react'
import s from './ImageGallery.module.css'
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({images= []}) => {
    return (
      <ul className={s.ImageGallery}>
      {images.map(image => (
             <ImageGalleryItem key={image.id} {...image} />
           ))}
     </ul>
    )

}