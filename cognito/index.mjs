// index.mjs
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({});

export const handler = async (event) => {
  if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
    try {
      await client.send(new AdminAddUserToGroupCommand({
        UserPoolId: event.userPoolId,
        Username: event.userName,
        GroupName: "user",
      }));
      console.log(`Added ${event.userName} to group "user"`);
    } catch (err) {
      console.error("AdminAddUserToGroup failed:", err);
      throw err; // surface error to logs
    }
  }
  return event;
};
