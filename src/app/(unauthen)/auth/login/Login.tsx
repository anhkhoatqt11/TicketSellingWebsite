'use client';


import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/Loader';
import React from 'react'
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Label } from '@radix-ui/react-label';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';


const formSchema = z.object({
    email: z.string().min(1, {
        message: 'Vui lòng nhập Email',
    }),
    password: z.string().min(1, {
        message: 'Vui lòng nhập Password',
    }),
});

const Login = ({ className }: { className?: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [show, setShow] = React.useState({
        showPass: false,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data) {
        console.log(data);
        setIsLoading(true);

        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        setIsLoading(false);

        if (res?.error) {
            console.log(res);
            return;
        }


        console.log(res);
        if (!res?.error) router.push('/');
        setIsLoading(false);
        console.log(res);
    }
    if (isLoading)
        return (
            <div className="w-full flex flex-col items-center justify-center">
                <Loader />
            </div>
        );
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className={cn('grid gap-6 w-[80%] md:w-[70%] lg:w-[60%] ', className)}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid gap-6'>
                            <div className='gap-8 flex flex-col gap-3'>
                                <div className="flex flex-col gap-3 ">
                                    <Label>Email</Label>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Nhập email của bạn" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-3 ">
                                    <Label>Password</Label>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        renderRight={
                                                            <div
                                                                onClick={() => {
                                                                    setShow({
                                                                        ...show,
                                                                        showPass: !show.showPass,
                                                                    });
                                                                }}
                                                                className="opacity-50 cursor-pointer hover:opacity-100"
                                                            >
                                                                {show.showPass ? (
                                                                    <AiFillEyeInvisible size={20} />
                                                                ) : (
                                                                    <AiFillEye size={20} />
                                                                )}
                                                            </div>
                                                        }
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        id="password"
                                                        placeholder="Nhập mật khẩu"
                                                        type={show.showPass ? 'text' : 'password'}
                                                        autoCapitalize="none"
                                                        autoComplete="password"
                                                        autoCorrect="off"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Button type="submit">Đăng nhập</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login