import {useState,useEffect} from 'react'
import {Image} from 'react-native'
import Base64ArrayBuffer from 'base64-arraybuffer'; 
import { ImageContent } from '../model/note';
import React from 'react';

export default ({image}:{image:ImageContent})=>{
console.log('image url:'+JSON.stringify( image.content))
return(
<Image source={image.content}/>)

}