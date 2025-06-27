"use client";

import { useQuery } from "react-query";
import axios from "axios";
import {
  Container,
  Heading,
  Text,
  Spinner,
  Center,
  VStack,
  Box,
  SimpleGrid,
  Button,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { API_URL } from "../config";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  published_on: string;
  image: string | null;
  related_link: string | null;
}

const fetchBlogList = async (): Promise<BlogPost[]> => {
  try {
    const response = await axios.get(`${API_URL}/news/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog list:", error);
    throw error;
  }
};

export default function BlogsPage() {
  const { data: blogList, isLoading, error } = useQuery<BlogPost[]>(
    ["fetchBlogList"],
    fetchBlogList
  );

  // Orange-themed color values for light and dark modes
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("orange.200", "orange.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("orange.800", "orange.200");
  const hoverBgColor = useColorModeValue("orange.50", "orange.900");
  const accentColor = useColorModeValue("orange.500", "orange.400");

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={16} px={{ base: 4, md: 6 }}>
        <VStack spacing={10} align="center" mb={12}>
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            bgGradient="linear(to-r, orange.400, orange.600)"
            bgClip="text"
            fontWeight="extrabold"
            lineHeight="shorter"
          >
            AI4Bharat Blogs
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            maxW="3xl"
            textAlign="center"
            color={textColor}
            lineHeight="tall"
          >
            Explore stories, research, and voices from AI4Bharat
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="xl"
              p={6}
              boxShadow="sm"
              bg={bgColor}
              borderColor={borderColor}
            >
              <Skeleton height="220px" mb={5} borderRadius="lg" />
              <Skeleton height="24px" width="80%" mb={3} />
              <Skeleton height="16px" width="50%" mb={4} />
              <Skeleton height="20px" mb={2} />
              <Skeleton height="20px" mb={2} />
              <Skeleton height="20px" mb={5} />
              <Skeleton height="40px" borderRadius="md" mt="auto" />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    );
  }

  if (error) {
    return (
      <Center h="80vh">
        <Text color="red.500" fontSize="lg" fontWeight="medium">
          Failed to load blogs. Please try again later.
        </Text>
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={16} px={{ base: 4, md: 6 }}>
      <VStack spacing={10} align="center" mb={12}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            bgGradient="linear(to-r, orange.400, orange.600)"
            bgClip="text"
            fontWeight="extrabold"
            lineHeight="shorter"
          >
            AI4Bharat Blogs
          </Heading>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Text
            fontSize={{ base: "md", md: "lg" }}
            maxW="3xl"
            textAlign="center"
            color={textColor}
            lineHeight="tall"
          >
            Explore stories, research, and voices from AI4Bharat
          </Text>
        </motion.div>
      </VStack>

      {blogList && blogList.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {blogList.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                overflow="hidden"
                p={6}
                boxShadow="sm"
                bg={bgColor}
                transition="transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease"
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: "xl",
                  bg: hoverBgColor,
                }}
                display="flex"
                flexDirection="column"
                position="relative"
              >
                {blog.image && (
                  <Box overflow="hidden" borderRadius="lg" mb={5} height="220px">
                    <motion.div
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={400}
                        height={220}
                        objectFit="cover"
                        loading="lazy"
                        style={{ transition: "transform 0.5s ease" }}
                        className="hover:scale-105"
                      />
                    </motion.div>
                  </Box>
                )}

                <Heading
                  as="h3"
                  size="md"
                  mb={3}
                  noOfLines={2}
                  fontWeight="bold"
                  color={headingColor}
                >
                  {blog.title}
                </Heading>

                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.500", "gray.400")}
                  mb={4}
                >
                  Published on: {new Date(blog.published_on).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>

                <Text
                  mb={5}
                  noOfLines={3}
                  fontSize="md"
                  color={textColor}
                  lineHeight="base"
                >
                  {blog.description}
                </Text>

                <Link href={`/blog/${blog.id}`} passHref>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      colorScheme="orange"
                      size="sm"
                      w="full"
                      mt="auto"
                      borderRadius="md"
                      fontWeight="medium"
                      transition="background 0.2s ease"
                      _hover={{ bg: "orange.600" }}
                    >
                      Read More
                    </Button>
                  </motion.div>
                </Link>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      ) : (
        <Center py={10}>
          <Text fontSize="lg" color={textColor} fontWeight="medium">
            No blog articles available at the moment.
          </Text>
        </Center>
      )}
    </Container>
  );
}
