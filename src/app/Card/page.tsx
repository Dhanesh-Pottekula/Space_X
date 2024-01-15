import React from "react";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
function CardComponent({ launch }: any) {
  return (
    <Card maxW="md" key={launch && launch?.launch_date_unix}>
      <CardHeader>
        <Flex className=" flex flex-col">
          <Flex flex="1" gap="4" alignItems="center" flexDirection={'row'} flexWrap="wrap" justifyContent={"space-between"} pb={'4'}>
    
              <Avatar flex="1"
                name="Segun Adebayo"
                src={launch && launch?.links?.mission_patch_small}
              />
              <Heading  flex="1" size="xs">
                {launch && launch.rocket?.rocket_name}
              </Heading>
              <Heading flex="1" size="xs" overflow={'hidden'}>
                {launch && launch.rocket?.rocket_type}
              </Heading>
              <div>
               {!launch?.upcoming && (launch?.launch_success ? (
                  <div className=" rounded-full bg-green-300 h-6 w-6 flex justify-center items-center">
                    <div className=" rounded-full bg-green-500 h-4 w-4"></div>{" "}
                  </div>
                ):<div className=" rounded-full bg-red-300 h-6 w-6 flex justify-center items-center">
                <div className=" rounded-full bg-red-500 h-4 w-4"></div>{" "}
              </div>)}
              </div>
          </Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap" justifyContent={"space-between"}>
            <Text size={"sm"} className=" font-bold text-sm pb-0 ">
              {" "}
              flight No:{launch && launch?.flight_number}
            </Text>
            <Box>
              <Text className=" font-bold text-sm pb-0 ">
                {new Date(launch?.launch_date_local).toLocaleDateString()} At -
                {launch?.launch_site.site_name}
              </Text>
              
            </Box>
            </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text maxH={"100px"} overflow={"auto"}>
          {launch && launch.details}
        </Text>
      </CardBody>
      <Image
        objectFit="scale-down"
        maxH={"md"}
        src={launch?.links?.flickr_images[0] || launch?.links?.mission_patch}
        alt="Chakra UI"
      />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Box className="flex justify-center items-center">
          {launch && launch.launch_success ? (
            <Text color={"green"} fontSize={"bold"}>
              Success
            </Text>
          ) : (
            <Text color={"red"} fontSize={"bold"}>
              {" "}
              Failure: {launch.launch_failure_details?.reason}
            </Text>
          )}
        </Box>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
