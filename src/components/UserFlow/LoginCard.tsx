"use client";
import { useState } from "react";
import { Button } from "@/components/Shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/ui/card";
import { Input } from "@/components/Shared/ui/input";
import { Label } from "@/components/Shared/ui/label";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import GoogleAuth from "./GoogleAuth";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const fetchUserRole = async (userID : any) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getUserById/${userID}`)
    // const role = JSON.stringify(response).data.role
    localStorage.setItem("role", response.data.user.role);
  }
  async function submitForm(endpoint : any) {
    console.log("endpoint is: " + endpoint);
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
        email,
        password,
      });
      console.log("response is:" + JSON.stringify(res));
      console.log("This is userID: " + res.data._id);
      fetchUserRole(res.data._id);
      window.localStorage.setItem("userId", res.data._id); 
      window.localStorage.setItem("token", res.data.token);
      router.push('/');
    } catch (error) {
      console.log('Login failed:', error); // Handle login failure
    }
  }

  return (
    <main className="bg-[#56C1FF] h-screen flex items-center justify-center p-10 w-full">
      <Card className="w-[600px] h-[550px] mx-auto p-6 shadow-lg border-2 border-blue-400">
        <CardHeader>
          <h2 className="text-2xl font-bold">Login</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <div className="flex justify-center">
          <Button
            className="mt-1 mx-3 w-full bg-[#FDCE29] text-black hover:bg-yellow-500"
            onClick={()=>submitForm("/user/signin")}
          >
            Login
          </Button>
          <Button
            className="mt-1 mx-3 w-full bg-[#fd2934] text-black hover:bg-red-800"
            onClick={() =>submitForm("/organizations/login")}
          >
            Login as Organization
          </Button>
        </div>
        <CardFooter className="text-center mt-4">
          <div className="flex justify-between w-[350px]">
            <div className="text-sm">
              Don't have an account?{" "}
              <Link href="/userflow/signup">
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Sign up!
                </span>
              </Link>
            </div>
          </div>
          <div className="text-sm ml-7">
            <Link href="/login">
              <span className="text-blue-600 cursor-pointer hover:underline ">
                Forgot Password?
              </span>
            </Link>
          </div>
        </CardFooter>
        <GoogleAuth />
      </Card>
    </main>
  );
}

export default LoginCard;
