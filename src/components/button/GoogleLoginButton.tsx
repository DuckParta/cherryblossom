import GoogleLogin from "react-google-login";
import { Button, Image } from "@chakra-ui/react";

const GoogleLoginBtn = ({
  onGoogleLogin,
  clientId,
}: {
  onGoogleLogin: any;
  clientId: string;
}) => {
  const onSuccess = async (response: any) => {
    const {
      profileObj: { googleId: userId, name },
    } = response;
    await onGoogleLogin(userId, name, true);
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      responseType={"id_token"}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          w="130px"
          h="130px"
          bgColor="white"
          borderRadius="xl"
          boxShadow="0 5px 25px rgb(0 0 0 / 15%)"
          _hover={{ bg: "white" }}
          _active={{ bg: "white" }}
          _focus={{ bg: "white" }}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/images/google_logo.jpeg`}
            w="60px"
          />
        </Button>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
};

export default GoogleLoginBtn;
