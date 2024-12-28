'use client'
import Head from 'next/head';
import classes from '../../styles/RegisterPage.module.css'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { useState } from "react";
import image from '../../public/assets/addImage.png'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

async function postData(formData){
    // for (const [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    // }
    const response = await fetch('http://127.0.0.1:8000/register_login/register/', {
      method: 'POST',
      body: formData
    })
  
    if (!response.ok) {
      const error = new Error('An error occurred while registering');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const result = await response.json();
    return result;
  }
  

export default function RegisterPage() {

    const [selectedImage, setSelectedImage] = useState(null)
    const router = useRouter()

    function handleChange(event) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file)
        setSelectedImage(imageUrl)
    }

    const {mutate, error, isError, isPending} = useMutation({
        mutationFn: postData,
        onSuccess: () => {
                // console.log("Success!");
                router.push('/')
            }
      })
    
      function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        mutate(formData);
      }
      

    return (
        <div className={classes.register}>
            <Head>
                <title>UApp</title>
                <link rel="icon" href="./logo.ico" />
            </Head>
            <motion.div className={classes.content} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <input className={classes.input} placeholder="Username" name="username" required type="text" />
                    <input className={classes.input} placeholder="Email" name="email" required type="email" />
                    <p style={{ color: 'white', fontFamily: "Arial, Helvetica, sans-serif" }}>Upload ID card</p>
                    <input id="image" type="file" name="validationImage" accept="image/*" className={classes.hiddenfileinput} required onChange={handleChange} multiple={false}/>
                    <label className={classes.label} htmlFor="image">
                        <Image
                            className={selectedImage ? classes.labelImg : classes.defaultImage} 
                            src={selectedImage ? selectedImage : image}
                            alt="add-image"
                            width={200}  
                            height={100}
                        />
                    </label>
                    <motion.button whileHover={{scale:1.05}} transition={{type:'tween'}} className={classes.button} disabled={isPending}>{isPending ? "Registering" : "Register"}</motion.button>
                    {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p>: undefined}
                </form>
                <Link className={classes.link} href={'/'}>Already have an account? Click here</Link>
            </motion.div>
        </div>
    );
}
