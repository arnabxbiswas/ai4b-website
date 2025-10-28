"use client";
import { ReactElement, useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Heading,
  Container,
  Card,
  CardBody,
  useColorModeValue,
  SkeletonCircle,
  HStack,
  SkeletonText,
  Link,
  Image as ChakraImage,
  useBreakpointValue,
  Wrap,
  Divider,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "@/app/config";
import { imagePrefix } from "@/app/config";
import {
  FaFileAudio,
  FaFileAlt,
  FaMicrophone,
  FaVolumeUp,
  FaLanguage,
  FaKeyboard,
} from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const datasetIcons: { [key: string]: React.ReactElement } = {
  llm: <FaFileAlt color="#ff6600" size={40} />,
  asr: <FaMicrophone color="#ff6600" size={40} />,
  nmt: <FaLanguage color="#ff6600" size={40} />,
  tts: <FaVolumeUp color="#ff6600" size={40} />,
  xlit: <FaKeyboard color="#ff6600" size={40} />,
};

const categoryNames: { [key: string]: string } = {
  llm: "Large Language Models",
  asr: "Automatic Speech Recognition",
  nmt: "Neural Machine Translation",
  tts: "Text-to-Speech",
  xlit: "Transliteration",
};

interface FeatureProps {
  title: string;
  icon: string;
  dataset_link: string;
}

interface Dataset {
  website_link: string | undefined;
  title: string;
  area: string;
}

const Feature = ({ title, icon, dataset_link }: FeatureProps) => {
  return (
    <Link href={dataset_link} _hover={{ textDecoration: "none" }} isExternal>
      <Box
        px={{ base: 3, md: 4 }}
        py={{ base: 2, md: 3 }}
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        rounded="md"
        transition="all 0.2s"
        _hover={{
          borderColor: "a4borange",
          transform: "translateY(-2px)",
          boxShadow: "md",
        }}
      >
        <Text 
          fontWeight={600} 
          fontSize={{ base: "xs", md: "sm" }} 
          color="gray.800"
          noOfLines={2}
        >
          {title}
        </Text>
      </Box>
    </Link>
  );
};

const fetchDatasets = async () => {
  try {
    const response = await axios.get(`${API_URL}/datasets/`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching datasets:", error);
    return [];
  }
};

// Mobile-responsive Carousel Component
const DataCollectionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

const images = [
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/9.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/10.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/11.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/12.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/13.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/14.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/15.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/16.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/17.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/18.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/19.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/20.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/21.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/22.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/23.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/24.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/25.png",
  "https://shoonyastorageproduction.blob.core.windows.net/ai4bwebsite/data-collection-new/26.png",
];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handlePrev = () => {
    if (isTransitioning) return;
    setDirection("prev");
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setDirection("next");
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleDotClick = (idx: number) => {
    if (isTransitioning || idx === currentIndex) return;
    setDirection(idx > currentIndex ? "next" : "prev");
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex(idx);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Touch event handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning, isHovered]);

  const getTransform = (idx: number) => {
    if (idx === currentIndex) {
      return "translateX(0) scale(1)";
    }
    
    if (isTransitioning && idx === previousIndex) {
      return direction === "next" 
        ? "translateX(-100%) scale(0.95)"
        : "translateX(100%) scale(0.95)";
    }
    
    return direction === "next"
      ? "translateX(100%) scale(0.95)"
      : "translateX(-100%) scale(0.95)";
  };

  const getOpacity = (idx: number) => {
    if (idx === currentIndex) return 1;
    if (isTransitioning && idx === previousIndex) return 0;
    return 0;
  };

  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  const buttonSpacing = useBreakpointValue({ base: 2, md: 3 });
  const dotSize = useBreakpointValue({ base: 3, md: 6 });
  const dotSpacing = useBreakpointValue({ base: 1, md: 2 });

  return (
    <Box
      position="relative"
      rounded={{ base: "xl", md: "2xl" }}
      width="full"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Box position="relative" width="full" height="auto">
        {images.map((image, idx) => (
          <Box
            key={idx}
            position={idx === currentIndex ? "relative" : "absolute"}
            top={0}
            left={0}
            width="full"
            opacity={getOpacity(idx)}
            transform={getTransform(idx)}
            transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            zIndex={idx === currentIndex ? 1 : 0}
          >
            <ChakraImage
              alt={`Data Collection ${idx + 1}`}
              src={image}
              width="100%"
              height="auto"
              rounded={{ base: "xl", md: "2xl" }}
              loading="eager"
            />
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons - Hidden on small mobile, visible on hover for desktop */}
      <IconButton
        aria-label="Previous image"
        icon={<ChevronLeftIcon boxSize={{ base: 4, md: 5 }} />}
        position="absolute"
        left={buttonSpacing}
        top="50%"
        transform="translateY(-50%)"
        size={buttonSize}
        bgColor="whiteAlpha.700"
        color="gray.700"
        display={{ base: "none", sm: "flex" }}
        opacity={isHovered ? 1 : 0}
        _hover={{
          bgColor: "white",
          color: "a4borange",
        }}
        onClick={handlePrev}
        zIndex={3}
        transition="all 0.3s ease"
        disabled={isTransitioning}
        backdropFilter="blur(8px)"
        borderRadius="full"
      />

      <IconButton
        aria-label="Next image"
        icon={<ChevronRightIcon boxSize={{ base: 4, md: 5 }} />}
        position="absolute"
        right={buttonSpacing}
        top="50%"
        transform="translateY(-50%)"
        size={buttonSize}
        bgColor="whiteAlpha.700"
        color="gray.700"
        display={{ base: "none", sm: "flex" }}
        opacity={isHovered ? 1 : 0}
        _hover={{
          bgColor: "white",
          color: "a4borange",
        }}
        onClick={handleNext}
        zIndex={3}
        transition="all 0.3s ease"
        disabled={isTransitioning}
        backdropFilter="blur(8px)"
        borderRadius="full"
      />

      {/* Progress Indicators */}
      <HStack
        position="absolute"
        bottom={{ base: 2, md: 4 }}
        left="50%"
        transform="translateX(-50%)"
        spacing={dotSpacing}
        zIndex={3}
      >
        {images.map((_, idx) => (
          <Box
            key={idx}
            w={idx === currentIndex ? dotSize : 2}
            h={2}
            rounded="full"
            bg={idx === currentIndex ? "white" : "whiteAlpha.500"}
            cursor="pointer"
            onClick={() => handleDotClick(idx)}
            transition="all 0.3s ease"
            _hover={{
              bg: "white",
            }}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default function Datasets() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [datasets, setDatasets] = useState([]);
  const { isLoading, error, data } = useQuery("fetchDatasets", fetchDatasets);

  useEffect(() => {
    if (error || isLoading) {
      setDatasets([]);
    } else {
      setDatasets(data);
    }
  }, [error, data, isLoading]);

  return (
    <Container maxW={"7xl"} px={{ base: 4, md: 6, lg: 8 }}>
      <Stack
        align={"center"}
        spacing={{ base: 6, md: 8, lg: 10 }}
        py={{ base: 6, md: 8, lg: 10 }}
        px={{ base: 0, md: 4 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 4, md: 6, lg: 10 }} width="full">
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "6xl" }}
            textAlign={"left"}
          >
            <Text as={"span"} color={"a4borange"} position={"relative"}>
              Pioneering
            </Text>
            <br />
            <Text as={"span"} color={"a4bred"}>
              Data Collection!
            </Text>
          </Heading>

          <Flex
            flex={2}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <DataCollectionCarousel />
          </Flex>

          <Text 
            fontSize={{ base: "sm", md: "md" }}
            textAlign={{ base: "justify", md: "left" }}
            lineHeight={{ base: "1.6", md: "1.8" }}
          >
            Early on in our journey, we recognized that advancing Indian
            technology necessitates large-scale datasets. Thus, building and
            collecting extensive datasets across multiple verticals has become a
            critical endeavor at AI4Bharat. Thanks to generous grants from
            MeitY, we are spearheading pioneering efforts in data collection as
            part of the Data Management Unit of Bhashini. Our nationwide
            initiative aims to gather 15,000 hours of transcribed data from over
            400 districts, encompassing all 22 scheduled languages of India. In
            parallel, our in-house team of over 100 translators is diligently
            creating a parallel corpus with 2.2 million translation pairs across
            22 languages. To produce studio-quality data for expressive TTS
            systems, we have established recording studios in our lab, where
            professional voice artists contribute their expertise. Additionally,
            our annotators are meticulously labeling pages for Document Layout
            Parsing, accommodating the diverse scripts of India. To accelerate
            the development of Indic Large Language Models (LLMs), we are
            focused on building pipelines for curating and synthetically
            generating pre-training data, collecting contextually grounded
            prompts, and creating evaluation datasets that reflect India's rich
            linguistic tapestry. Collecting and annotating data at this scale
            demands standardization of processes and tools. To meet this
            challenge, AI4Bharat has invested in developing various open-source
            data collection and annotation tools, aiming to enhance these
            efforts not only within India but also in multilingual regions
            across the globe.
          </Text>

          {isLoading ? (
            <Stack spacing={4}>
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Stack>
          ) : (
            <VStack 
              spacing={{ base: 6, md: 8 }} 
              width="full" 
              align="stretch" 
              mt={{ base: 4, md: 6 }}
            >
              {Object.entries(datasetIcons).map(([key, val]) => {
                const categoryDatasets = datasets.filter(
                  (dataset: Dataset) => dataset.area.toLowerCase() === key
                );

                return (
                  <Box key={key}>
                    {/* Category Header */}
                    <HStack 
                      spacing={{ base: 2, md: 3 }} 
                      mb={{ base: 3, md: 4 }}
                      flexWrap="wrap"
                    >
                      <Box
                        p={{ base: 2, md: 3 }}
                        bg="orange.50"
                        rounded="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        {val}
                      </Box>
                      <Heading 
                        size={{ base: "sm", md: "md" }} 
                        color="gray.800"
                      >
                        {categoryNames[key]}
                      </Heading>
                    </HStack>

                    {/* Dataset Grid */}
                    <SimpleGrid
                      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                      spacing={{ base: 2, md: 3 }}
                      mb={{ base: 4, md: 6 }}
                    >
                      {categoryDatasets.map((dataset: Dataset) => (
                        <Feature
                          key={dataset.title}
                          icon={dataset.area.toLowerCase()}
                          title={dataset.title}
                          dataset_link={
                            dataset.website_link ? dataset.website_link : ""
                          }
                        />
                      ))}
                    </SimpleGrid>

                    <Divider borderColor="gray.200" />
                  </Box>
                );
              })}
            </VStack>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
