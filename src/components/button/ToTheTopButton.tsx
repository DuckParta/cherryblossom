import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const ToTheTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      position="fixed"
      right="6%"
      bottom="6%"
      w="10px"
      bgColor="gray.200"
      opacity="70%"
      borderRadius="full"
    >
      <ArrowUpIcon />
    </Button>
  );
};

export default ToTheTopButton;
