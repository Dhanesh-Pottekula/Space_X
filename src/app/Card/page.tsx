import React from 'react'
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
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
function CardComponent({launch}:any) {
  return (
    <Card maxW="md">
    <CardHeader>
      <Flex>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar
            name="Segun Adebayo"
            src={launch.links.mission_patch_small}
          />

          <Box>
            <Heading size="sm">{launch.rocket.rocket_name}</Heading>
            <Text>

 
              {new Date(launch.launch_date_local).toLocaleDateString()}{" "} At  
              {launch.launch_site.site_name}
            </Text>
          </Box>
        </Flex>
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
        />
      </Flex>
    </CardHeader>
    <CardBody>
      <Text maxH={"100px"} overflow={"auto"}>
        {launch.details}
      </Text>
    </CardBody>
    <Image
      objectFit="scale-down"
      maxH={"md"}
      src={
        launch.links.flickr_images[0] || launch.links.mission_patch
      }
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
        {launch.launch_success ? (
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
  </Card>)
}

export default CardComponent