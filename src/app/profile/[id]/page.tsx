"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "@/redux/slices/launchesSlice";
import type { RootState } from "../../../redux/store";
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
import CardComponent from "@/app/Card/page";
export default function page() {
  const router = useRouter();
  const launchInfo = useSelector((state: RootState) => state.counter.launches);
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      const response = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function getlaunch() {
    try {
      const response = await axios("https://api.spacexdata.com/v3/launches");
      const data: any[] = response.data;

      dispatch(increment(data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getlaunch();
  }, []);
  return (
    <div className="  p-2 bg-slate-300 ">
      <Box className=" flex flex-row justify-between pb-2">
        
        <Stack spacing={5} direction="row" className=" pr-28 pl-11 ">
          <Checkbox
            colorScheme="blue"
            defaultChecked
            onChange={(e) => {
              console.log();
            }}
          >
            Past
          </Checkbox>
          <Checkbox colorScheme="blue" defaultChecked>
            Upcoming
          </Checkbox>
        </Stack>
        <Button
          className=" bg-blue-400 p-4 text-white font-bold pr-14 m-6"
          onClick={handleLogout}
        >
          logout
        </Button>
      </Box>
      <Box className=" w-1/2 pb-8">
        <RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]} onChange={(values)=>{
          console.log(values)
        }}>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Box>

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {launchInfo.map((launch: any) => {
          return (
            <CardComponent launch={launch}></CardComponent>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
