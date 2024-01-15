"use client";
import React, { useEffect, useState } from "react";
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
  const [range, setRange] = useState({ minYear: 1900, maxYear: 2024 });
  const [upcoming, setUpcoming] = useState(false);
  const [Past, setPast] = useState(false);

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
           
            onChange={(e) => {
             setPast(!Past)
            }}
          >
            Past
          </Checkbox>
          <Checkbox colorScheme="blue" onChange={(e)=>{setUpcoming(!upcoming)}} >
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
        <RangeSlider
          defaultValue={[1990, 2000]}
          min={1900}
          max={2024}
          step={1}
          onChange={(values) => {
            setRange({ minYear: values[0], maxYear: values[1] });
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Text className=" pl-10">
          {range.minYear} to {range.maxYear}
        </Text>
      </Box>

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {launchInfo.map((launch: any) => {
          console.log(
          range.maxYear)
          if (
            range.minYear <=new Date(Date.parse(launch.launch_date_local)).getFullYear() &&
            new Date(Date.parse(launch.launch_date_local)).getFullYear() <= range.maxYear
          ) {
            // console.log(Past,upcoming)
            if (upcoming === launch.upcoming){
            return <CardComponent launch={launch}></CardComponent>;
            }
            if(Past!==launch.upcoming){
            return <CardComponent launch={launch}></CardComponent>;
            }
            if(!Past && !upcoming){
              console.log("sdasfasfsafasdfsafasfasdsa")
            return <CardComponent launch={launch}></CardComponent>;
            }
          } else {
            return;
          }
        })}
      </SimpleGrid>
    </div>
  );
}
