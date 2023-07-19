import React, { useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { FormControl } from '@chakra-ui/react'
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { Button } from '@chakra-ui/react';


const Login = () => {
    const [show, setShow] = useState(false)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = (values) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // alert(JSON.stringify(values, null, 2))
                console.log(values)
                resolve()
            }, 2000)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={'5px'}>
                <FormControl>
                    {/* <FormLabel>Username</FormLabel> */}
                    <Input
                        placeholder='Username'
                        {...register('username', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                </FormControl>

                <FormControl>
                    {/* <FormLabel>Password</FormLabel> */}
                    <InputGroup>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder='password'
                            {...register('password', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        <InputRightAddon width={'4.5rem'}>
                            <Button
                                h={'1.75rem'}
                                size={'sm'}
                                onClick={() => {
                                    setShow(!show)
                                }}
                            >
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightAddon>
                    </InputGroup>
                </FormControl>

                <Button
                    width={'100%'}
                    colorScheme='teal'
                    isLoading={isSubmitting}
                    type='submit'
                    style={{
                        marginTop: 30,
                        // backgroundColor: 'black',
                        color: 'white'
                    }}
                >
                    Login
                </Button>
            </VStack >

        </form>
    )
}

export default Login
