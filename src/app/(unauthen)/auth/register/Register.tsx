'use client';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  cn,
  regexPasswordNumber,
  regexPasswordSpecial,
  regexPasswordUpperCase,
} from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/components/Loader';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//quan ly form: react-hook-form
//validate form: zod

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    password: z
      .string()
      .min(1, {
        message: 'Password is required',
      })
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(regexPasswordSpecial, {
        message: 'Password must contain at least 1 special character',
      })
      .regex(regexPasswordNumber, {
        message: 'Password must contain at least 1 number',
      })
      .regex(regexPasswordUpperCase, {
        message: 'Password must contain at least 1 uppercase character',
      }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email({ message: 'Email is invalid' }),
    confirmPassword: z.string().min(1, {
      message: 'Confirm password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  });
const Register = ({
  className,
  payload,
}: {
  className?: string;
  payload: any;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: payload.name || '',
      email: payload.email || '',
      password: '',
      confirmPassword: '',
    },
  });
  const { onRegister } = useAuth();

  useEffect(() => {
    if (payload?.email && payload?.name) {
      toast.error(
        'Your account is not registered yet, please register to continue'
      );
    }
  }, []);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data) {
    console.log(data);

    setIsLoading(true);
    onRegister(data, () => {
      setIsLoading(false);
    });
  }
  if (isLoading)
    return (
      <div className="w-full flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={cn('grid gap-6 w-[80%] md:w-[70%] lg:w-[60%] ', className)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="gap-8 flex flex-col">
                <div className="flex flex-col gap-3 ">
                  <Label>Email</Label>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Nhập Email của bạn"
                            autoComplete="username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3 ">
                  <Label>Họ và tên</Label>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3 ">
                  <Label>Mật khẩu</Label>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Nhập mật khẩu"
                              type={show.password ? 'text' : 'password'}
                              value={field.value}
                              onChange={field.onChange}
                              renderRight={
                                <div
                                  onClick={() => {
                                    setShow({
                                      ...show,
                                      password: !show.password,
                                    });
                                  }}
                                  className="opacity-50 cursor-pointer hover:opacity-100"
                                >
                                  {show.password ? (
                                    <AiFillEyeInvisible size={20} />
                                  ) : (
                                    <AiFillEye size={20} />
                                  )}
                                </div>
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3 ">
                  <Label>Mật khẩu xác nhận</Label>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Xác nhận mật khẩu"
                              type={show.confirmPassword ? 'text' : 'password'}
                              value={field.value}
                              onChange={field.onChange}
                              renderRight={
                                <div
                                  onClick={() => {
                                    setShow({
                                      ...show,
                                      confirmPassword: !show.confirmPassword,
                                    });
                                  }}
                                  className="opacity-50 cursor-pointer hover:opacity-100"
                                >
                                  {show.confirmPassword ? (
                                    <AiFillEyeInvisible size={20} />
                                  ) : (
                                    <AiFillEye size={20} />
                                  )}
                                </div>
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>

              <Button type="submit" className="">
                Đăng ký
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <p className=" mt-10 text-center text-sm text-muted-foreground">
        Đã có tài khoản?{' '}
        <Link className=" font-bold underline text-black" href="/auth/login">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default Register;
