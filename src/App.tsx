import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";

function App() {
  const [buttonName, setButtonName] = useState("Send");
  const [delayInputValue, setDelayInputValue] = useState("");
  const [slackWebHookUrl, setSlackWebhookUrl] = useState<string>("");

  const handleSendMessage = async () => {
    await fetch(slackWebHookUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: "Hello World!",
      }),
    });
  };

  useEffect(() => {
    setButtonName((prev) => `${prev} ${delayInputValue}`);
  }, [delayInputValue, slackWebHookUrl]);

  return (
    <div className="flex flex-col justify-center min-h-svh max-w-2xl mx-auto">
      <Input onChange={(e) => setDelayInputValue(e.target.value)} />
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <label>Slack Hook URL Input</label>
      <Input onChange={(e) => setSlackWebhookUrl(e.target.value)} />
      <Button onClick={handleSendMessage}>{buttonName}</Button>
    </div>
  );
}

export default App;
