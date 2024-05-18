"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="relative flex w-full h-full min-h-fit place-content-center m-auto  py-10">
      <Card className="relative p-7 space-y-8 items-center w-1/3 min-h-fit h-4/5">
        <h1>Login to Alexandria</h1>
        <Input
          className="w-2/3"
          placeholder="Enter your email"
          type="email"
          isRequired
          onChange={(s) => setEmail(s.currentTarget.value)}
        />
        <Input
          className="w-2/3"
          placeholder="Enter your password"
          type="password"
          isRequired
          onChange={(s) => setPassword(s.currentTarget.value)}
        />
        <Button className="w-2/3" type="submit" variant="ghost">
          Login
        </Button>
      </Card>
    </form>
  );
}
