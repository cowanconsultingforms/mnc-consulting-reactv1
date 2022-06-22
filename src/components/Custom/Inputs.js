import React from "react";
import { TextField } from "@mui/material";
import {useController,useForm,useWatch} from 'react-hook-form';
import {useState,useEffect} from 'react';



export const Controller = ({control,register,name,rules,render} )=>{
  const value= useWatch({control,name})
  const props = register(name,rules);
  return render({
    onChange:(e) =>props.onChange({
      target:{
        name,
        value:e.target.value
      }
    }),
    onBlur:props.onBlur,
    name:props.name
});
};
export const Input = (props)=>{
  const [value,setValue] = useState(props.value || "");
  useEffect(() => {
    setValue(props.value);
  

  }, [props.value]);
  
  return(
    <input 
    name={props.name}
    onChange={(e)=>{setValue(e.target.value)
    props.onChange && props.onChange(e.target.value)}}
    value={value} />
  );
}
export const TextFieldContactForm = ({})
export default {Input,Controller};