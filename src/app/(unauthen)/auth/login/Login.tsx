"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import React from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { main_color } from "../../../../../public/color";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Vui lòng nhập Email",
  }),
  password: z.string().min(1, {
    message: "Vui lòng nhập Password",
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
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    console.log(data);
    setIsLoading(true);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);

    if (res?.error) {
      if (res?.error === "Email or password is incorrect") {
        toast.error("Email hoặc mật khẩu không chính xác");
      } else if (res?.error === "Your account has been locked") {
        toast.error("Tài khoản của bạn đã bị khoá");
      }
      return;
    }

    console.log(res);
    if (!res?.error) {
      router.push("/");
      toast.success("Đăng nhập thành công");
      router.refresh();
    }
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
      <div
        className={cn("grid gap-6 w-[80%] md:w-[70%] lg:w-[60%] ", className)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="gap-8 flex flex-col">
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
                            type={show.showPass ? "text" : "password"}
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
              <Button
                className={`font-semibold bg-[#3BE1AA]  text-white hover:bg-[#2DD196] hover:scale-105 transition ease-in-out active:scale-[0.96]`}
                type="submit"
              >
                Đăng nhập
              </Button>
              <p className="mt-10 px-8 text-center text-sm text-muted-foreground">
                Chưa có tài khoản?{" "}
                <Link
                  className="font-bold underline text-black"
                  href="/auth/register"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
