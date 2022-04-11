import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

export default function ToTheTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <Button 
      onClick={scrollToTop}
      position="fixed"
      right="5%"
      bottom="5%"
      w="10px"
      bgColor="gray.200"
      opacity="70%"
      borderRadius="full"
    >
      <ArrowUpIcon/>
    </Button>
  );
}