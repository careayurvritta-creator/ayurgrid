"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Lock, Mail, Leaf } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    // const supabase = createClient(); // Using imported singleton

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                setError(error.message);
                return;
            }

            router.push("/dashboard"); // Redirect to dashboard after login
            router.refresh();
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-slate-950 font-sans relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <Card className="w-full max-w-md mx-4 bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl relative z-10 text-emerald-50">
                <CardHeader className="space-y-1 text-center pb-8 border-b border-white/5">
                    <div className="mx-auto bg-emerald-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Leaf className="w-8 h-8 text-emerald-400" />
                    </div>
                    <CardTitle className="text-3xl font-heading font-bold tracking-tight text-white">
                        AyurGrid PMS
                    </CardTitle>
                    <CardDescription className="text-emerald-200/70 text-base">
                        Secure login for practitioners
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-emerald-100/80">Email Address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-emerald-200/50" />
                                                <Input
                                                    placeholder="doctor@clinic.com"
                                                    {...field}
                                                    className="pl-9 bg-black/20 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 hover:border-white/20 transition-colors"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-300" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-emerald-100/80">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-emerald-200/50" />
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="pl-9 bg-black/20 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 hover:border-white/20 transition-colors"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-300" />
                                    </FormItem>
                                )}
                            />

                            {error && (
                                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2">
                                    <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-lg shadow-emerald-900/20 border border-emerald-500/20 h-11 transition-all duration-300 transform hover:scale-[1.01]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    "Sign In to Clinic"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm border-t border-white/5 pt-6 text-emerald-200/50">
                    <Link href="/auth/recovery" className="hover:text-emerald-300 transition-colors hover:underline">
                        Forgot your password?
                    </Link>
                    <div className="text-xs">
                        Powered by <span className="text-emerald-400 font-medium">AyurVritta</span> &copy; 2026
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
