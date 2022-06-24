import React from "react";
import { useForm } from "react-hook-form";

const TestForm = () =>{
    const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true, maxLength: 20 })} />
      <input {...register("password",{ required: true, maxLength: 20 } )} />
      <input {...register("password2", { required: true, maxLength: 20 })} />
      <input type="submit" />
    </form>
  );
}

export default TestForm;