import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface sendMessageProps {
  slackWebHookUrl: string;
  candidateName: string;
  messageValue: string;
}
function App() {
  const candidateName = "Jeriel Formento";
  const [buttonName, setButtonName] = useState("Send");
  const [delayInputValue, setDelayInputValue] = useState<string>("");
  const [messageValue, setMessageValue] = useState<string>("");
  const [slackWebHookUrl, setSlackWebhookUrl] = useState<string>("");
  const [intervalType, setIntervalType] = useState<string>("");

  const handleSendMessage = async ({
    slackWebHookUrl,
    candidateName,
    messageValue,
  }: sendMessageProps) => {
    await fetch(slackWebHookUrl, {
      method: "POST",
      body: JSON.stringify({
        text: `${candidateName}'s Slack Bot: ${messageValue}`,
      }),
    }).finally(() => console.log("ok sent"));
  };

  const setCountdownTimer = () => {
    const timer =
      parseInt(delayInputValue) != 0 ? parseInt(delayInputValue) : 0;

    let countdown = 0;
    if (intervalType === "seconds") {
      countdown = timer * 1000;
    } else if (intervalType === "minutes") {
      countdown = timer * 1000 * 60;
    } else if (intervalType === "hours") {
      countdown = timer * 1000 * 60 * 60;
    }

    console.log(countdown);

    const countdownInterval = setInterval(() => {
      handleSendMessage({ slackWebHookUrl, candidateName, messageValue });
      clearInterval(countdownInterval);
      alert("Message sent!");
    }, countdown);
    return () => clearInterval(countdownInterval);
  };

  const handleIntervalTypeChange = (e: any) => {
    console.log("change", e);
    setIntervalType(e);
  };

  useEffect(() => {
    setButtonName(`Send ${delayInputValue} ${intervalType}`);
  }, [delayInputValue, intervalType]);

  return (
    <div className="flex flex-col justify-center min-h-svh max-w-2xl mx-auto">
      <h2 className="text-2xl mb-5">Delayed Slack Message Sender</h2>

      <label>Input Delay</label>
      <Input onChange={(e) => setDelayInputValue(e.target.value)} />
      <Select onValueChange={handleIntervalTypeChange}>
        <SelectTrigger className="w-full mt-3">
          <SelectValue placeholder="Interval" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="seconds">seconds</SelectItem>
          <SelectItem value="minutes">minutes</SelectItem>
          <SelectItem value="hours">hours</SelectItem>
        </SelectContent>
      </Select>

      <label>Slack Message Input</label>
      <Input onChange={(e) => setMessageValue(e.target.value)} />
      <label>Slack Hook URL Input</label>
      <Input onChange={(e) => setSlackWebhookUrl(e.target.value)} />
      <Button onClick={setCountdownTimer} className="mt-2">
        {buttonName}
      </Button>
    </div>
  );
}

export default App;
