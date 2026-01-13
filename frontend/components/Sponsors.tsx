"use client";
import { imagePrefix } from "@/app/config";
import { Box, Container, Heading, Link, Stack } from "@chakra-ui/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sponsors = [
  {
    src: `${imagePrefix}/assets/logos/meity.svg`,
    alt: "Ministry of Electronics and IT",
    url: "https://meity.gov.in",
  },
  {
    src: `${imagePrefix}/assets/logos/nilekani.png`,
    alt: "Rohini Nilekani Philanthropies",
    url: "https://rohininilekaniphilanthropies.org",
  },
  {
    src: `${imagePrefix}/assets/logos/ekstep.png`,
    alt: "EkStep Foundation",
    url: "https://ekstep.org",
  },
  {
    src: `${imagePrefix}/assets/logos/C-DAC.png`,
    alt: "C-DAC",
    url: "https://www.cdac.in",
  },
  {
    src: `${imagePrefix}/assets/logos/microsoft.png`,
    alt: "Microsoft",
    url: "https://www.microsoft.com/en-in",
  },
  {
    src: `${imagePrefix}/assets/logos/google.png`,
    alt: "Google",
    url: "https://www.google.com",
  },
  {
    src: `${imagePrefix}/assets/logos/yotta.png`,
    alt: "Yotta Infrastructure",
    url: "https://yotta.com",
  },
];

const SponsorCard = ({ sponsor, index, scrollX, isPaused }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;

  const getDistanceFromCenter = () => {
    if (!cardRef.current) return 1000;
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    return Math.abs(centerX - cardCenter);
  };

  const distance = useMotionValue(1000);
  const grayscaleValue = useTransform(distance, [0, 400], [0, 100]);
  const opacityValue = useTransform(distance, [0, 400], [1, 0.7]);
  const scaleValue = useTransform(distance, [0, 400], [1.1, 1]);

  useEffect(() => {
    const updateDistance = () => {
      distance.set(getDistanceFromCenter());
    };

    updateDistance();
    const interval = setInterval(updateDistance, 50);
    return () => clearInterval(interval);
  }, [scrollX]);

  return (
    <Link
      href={sponsor.url}
      isExternal
      _hover={{ textDecoration: "none" }}
      flexShrink={0}
    >
      <Box
        ref={cardRef}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        minW="220px"
        h="110px"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{
          boxShadow: "md",
        }}
      >
        <motion.div
          style={{
            position: "relative",
            width: "180px",
            height: "70px",
            filter: useTransform(grayscaleValue, (v) => `grayscale(${v}%)`),
            opacity: opacityValue,
            scale: scaleValue,
            transition: "all 0.2s ease-out",
          }}
        >
          <Image
            src={sponsor.src}
            alt={sponsor.alt}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </motion.div>
      </Box>
    </Link>
  );
};

export default function Sponsors() {
  const scrollX = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Box py={16} overflow="hidden">
      <Stack spacing={8} as={Container} maxW={"5xl"} textAlign={"center"}>
        <Heading
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          fontWeight={"bold"}
        >
          Our Sponsors
        </Heading>
      </Stack>

      <Box
        mt={12}
        position="relative"
        overflow="hidden"
        w="100%"
        _before={{
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 2,
          height: "100%",
          width: "150px",
          bgGradient: "linear(to-r, white, transparent)",
          pointerEvents: "none",
        }}
        _after={{
          content: '""',
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 2,
          height: "100%",
          width: "150px",
          bgGradient: "linear(to-l, white, transparent)",
          pointerEvents: "none",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          animate={isPaused ? {} : { x: [0, "-100%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            display: "flex",
            gap: "3rem",
            alignItems: "center",
            width: "max-content",
            x: scrollX,
          }}
        >
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
            <SponsorCard
              key={`${sponsor.alt}-${index}`}
              sponsor={sponsor}
              index={index}
              scrollX={scrollX}
              isPaused={isPaused}
            />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}
