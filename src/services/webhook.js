
export const handleSendMessage = async (webhookUrl, candidateName, messageValue) => {
    await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify({
        text: `${candidateName}'s Slack Bot: ${messageValue}`,
      }),
    }).finally(() => console.log("ok sent"));
};