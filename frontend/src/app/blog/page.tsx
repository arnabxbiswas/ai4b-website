"use client";

import { useQuery } from "react-query";
import {
  Container,
  Heading,
  Text,
  Spinner,
  Center,
  VStack,
  Box,
  Button,
  useColorModeValue,
  Skeleton,
  Badge,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useBreakpointValue,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUser, 
  FaArrowRight, 
  FaBookOpen,
  FaFilter,
  FaTags,
  FaChevronDown,
  FaHome
} from "react-icons/fa";
import { API_URL } from "../config";

interface Blog {
  id: number;
  title: string;
  description: string;
  published_on: string;
  image: string | null;
  related_link: string | null;
  markdown_content: string;
  cover_image?: { src: string; alt: string; caption?: string } | null;
  authors?: Array<{ name: string; affiliationId?: string }>;
  affiliations?: Array<{ id: string; name: string }>;
  publication_links?: Array<{ text: string; url: string; icon?: string }> | null;
  sections?: Array<{
    type: string;
    heading?: string;
    content?: string;
    headers?: string[];
    rows?: string[][];
    items?: Array<{ id: string; prompt: string; response: string }>;
    image?: { src: string; alt?: string; caption?: string };
  }>;
  team?: {
    students?: Array<{ name: string }>;
    advisors?: Array<{ name: string }>;
    contacts?: Array<{ name: string; email?: string }>;
  };
  bibtex?: string;
}

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

function getReadingTime(content: string): string {
  const wordsPerMinute = 225;
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function BlogCardSkeleton() {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("orange.100", "orange.800");

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg={cardBg}
      borderColor={borderColor}
      height="580px"
      boxShadow="sm"
    >
      <Skeleton height="240px" borderRadius="0" />
      <Box p={6} height="340px" display="flex" flexDirection="column" gap={4}>
        <HStack justify="space-between">
          <Skeleton height="20px" width="80px" borderRadius="full" />
          <Skeleton height="16px" width="60px" />
        </HStack>
        <Skeleton height="20px" width="90%" />
        <Skeleton height="20px" width="70%" />
        <VStack spacing={2} align="start" flex={1}>
          <Skeleton height="14px" width="100%" />
          <Skeleton height="14px" width="100%" />
          <Skeleton height="14px" width="80%" />
        </VStack>
        <Skeleton height="16px" width="120px" />
        <Skeleton height="44px" borderRadius="xl" />
      </Box>
    </Box>
  );
}

function SearchAndFilter({ 
  searchTerm, 
  onSearchChange, 
  totalCount 
}: { 
  searchTerm: string; 
  onSearchChange: (value: string) => void;
  totalCount: number;
}) {
  const inputBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("orange.200", "orange.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box mb={12}>
      <VStack spacing={6}>
        <InputGroup maxW="600px" size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="orange.400" />
          </InputLeftElement>
          <Input
            placeholder="Search articles by title, description, or author..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            bg={inputBg}
            borderColor={borderColor}
            borderWidth="2px"
            borderRadius="xl"
            fontSize="md"
            _hover={{ borderColor: "orange.300" }}
            _focus={{ 
              borderColor: "orange.400", 
              boxShadow: "0 0 0 1px orange.400" 
            }}
            _placeholder={{ color: textColor }}
          />
        </InputGroup>
        
        <HStack spacing={4} color={textColor} fontSize="sm">
          <HStack spacing={2}>
            <Icon as={FaBookOpen} />
            <Text fontWeight="medium">
              {totalCount} {totalCount === 1 ? 'article' : 'articles'} available
            </Text>
          </HStack>
          {searchTerm && (
            <>
              <Divider orientation="vertical" h="20px" />
              <Text>
                Searching for: <Text as="span" fontWeight="semibold" color="orange.500">"{searchTerm}"</Text>
              </Text>
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("orange.100", "orange.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("orange.25", "orange.950");
  const shadowColor = useColorModeValue("rgba(251, 146, 60, 0.1)", "rgba(251, 146, 60, 0.2)");

  const readingTime = getReadingTime(blog.markdown_content);
  const authorNames = blog.authors?.map(author => author.name).join(", ") || "AI4Bharat Team";
  const coverImageSrc = blog.image || blog.cover_image?.src;

  return (
    <MotionBox
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={shouldReduceMotion ? {} : { 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      height="580px"
    >
      <Box
        as={Link}
        href={`/blog/${blog.id}`}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="2xl"
        overflow="hidden"
        bg={cardBg}
        boxShadow={`0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          textDecoration: "none",
          boxShadow: `0 20px 25px -5px ${shadowColor}, 0 10px 10px -5px ${shadowColor}`,
          bg: hoverBg,
          borderColor: "orange.200",
        }}
        height="100%"
        display="flex"
        flexDirection="column"
        position="relative"
        cursor="pointer"
        role="article"
        aria-label={`Read article: ${blog.title}`}
      >
        {/* Enhanced Image Section */}
        <Box position="relative" overflow="hidden" height="240px" flexShrink={0}>
          {coverImageSrc && !imageError ? (
            <>
              <Image
                src={coverImageSrc}
                alt={blog.cover_image?.alt || blog.title}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="hover:scale-110"
                onError={() => setImageError(true)}
                quality={85}
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient="linear(to-t, blackAlpha.300, transparent)"
              />
              {/* Reading time overlay */}
              <Badge
                position="absolute"
                top={4}
                right={4}
                colorScheme="orange"
                variant="solid"
                fontSize="xs"
                fontWeight="semibold"
                px={3}
                py={1}
                borderRadius="full"
                bg="rgba(251, 146, 60, 0.9)"
                backdropFilter="blur(4px)"
              >
                {readingTime}
              </Badge>
            </>
          ) : (
            <Box
              height="100%"
              bgGradient="linear(to-br, orange.100, orange.200)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <VStack spacing={3}>
                <Box
                  w={16}
                  h={16}
                  borderRadius="full"
                  bg="orange.300"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="lg"
                >
                  <Icon as={FaBookOpen} fontSize="2xl" color="white" />
                </Box>
                <Text color="orange.600" fontSize="sm" fontWeight="semibold">
                  Research Article
                </Text>
              </VStack>
              <Badge
                position="absolute"
                top={4}
                right={4}
                colorScheme="orange"
                variant="solid"
                fontSize="xs"
                fontWeight="semibold"
                px={3}
                py={1}
                borderRadius="full"
              >
                {readingTime}
              </Badge>
            </Box>
          )}
        </Box>

        {/* Enhanced Content Section */}
        <Box 
          p={6} 
          display="flex"
          flexDirection="column"
          flex={1}
          gap={4}
        >
          {/* Date and Author Info */}
          <HStack justify="space-between" align="center">
            <Badge
              colorScheme="orange"
              variant="subtle"
              fontSize="xs"
              fontWeight="semibold"
              px={3}
              py={1}
              borderRadius="full"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Icon as={FaCalendarAlt} fontSize="xs" />
              {formatDate(blog.published_on)}
            </Badge>
            <Text fontSize="xs" color={textColor} fontWeight="medium">
              {authorNames.length > 20 ? `${authorNames.substring(0, 20)}...` : authorNames}
            </Text>
          </HStack>

          {/* Title */}
          <Heading
            as="h3"
            fontSize="xl"
            fontWeight="bold"
            color={headingColor}
            lineHeight="1.3"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '2.6em',
              maxHeight: '2.6em'
            }}
          >
            {blog.title}
          </Heading>

          {/* Description */}
          <Text
            fontSize="sm"
            color={textColor}
            lineHeight="1.6"
            flex={1}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {blog.description}
          </Text>

          {/* Tags/Categories */}
          {blog.publication_links && blog.publication_links.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              <Icon as={FaTags} fontSize="xs" color="orange.400" />
              {blog.publication_links.slice(0, 2).map((link, idx) => (
                <Badge
                  key={idx}
                  size="sm"
                  colorScheme="orange"
                  variant="outline"
                  fontSize="xs"
                  borderRadius="md"
                >
                  {link.text}
                </Badge>
              ))}
              {blog.publication_links.length > 2 && (
                <Text fontSize="xs" color={textColor}>
                  +{blog.publication_links.length - 2} more
                </Text>
              )}
            </HStack>
          )}

          {/* Enhanced Button */}
          <Button
            bgGradient="linear(to-r, orange.400, orange.500)"
            color="white"
            size="md"
            w="full"
            borderRadius="xl"
            fontWeight="semibold"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{ 
              bgGradient: "linear(to-r, orange.500, orange.600)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px -8px orange.400"
            }}
            _active={{
              transform: "translateY(0)",
            }}
            rightIcon={<Icon as={FaArrowRight} />}
            mt="auto"
          >
            Read Full Article
          </Button>
        </Box>
      </Box>
    </MotionBox>
  );
}

const fetchBlogList = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_URL}/news/`, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Failed to fetch blog list");
  const data = await response.json();
  return data;
};

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const toast = useToast();
  
  const { data: blogList, isLoading, error, refetch } = useQuery<Blog[]>(
    ["fetchBlogList"],
    fetchBlogList,
    {
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000,
      onError: () => {
        toast({
          title: "Failed to load articles",
          description: "Please check your connection and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  );

  const filteredBlogs = useMemo(() => {
    if (!blogList) return [];
    if (!searchTerm.trim()) return blogList;

    const searchLower = searchTerm.toLowerCase();
    return blogList.filter(blog => 
      blog.title.toLowerCase().includes(searchLower) ||
      blog.description.toLowerCase().includes(searchLower) ||
      blog.authors?.some(author => 
        author.name.toLowerCase().includes(searchLower)
      )
    );
  }, [blogList, searchTerm]);

  const bgColor = useColorModeValue("orange.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("gray.900", "white");

  const gridColumns = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 3,
    xl: 3
  });

  if (isLoading) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Container maxW="7xl" py={20} px={{ base: 6, md: 8 }}>
          {/* Header */}
          <VStack spacing={12} align="center" mb={16}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              textAlign="center"
              bgGradient="linear(to-r, orange.400, orange.600, orange.500)"
              bgClip="text"
              fontWeight="black"
              letterSpacing="tight"
            >
              AI4Bharat Blog's            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              maxW="4xl"
              textAlign="center"
              color={textColor}
              lineHeight="relaxed"
              fontWeight="medium"
            >
              Discover cutting-edge research, insights, and innovations from the AI4Bharat community
            </Text>
          </VStack>
          
          {/* Loading Skeletons */}
          <SimpleGrid columns={gridColumns} spacing={8} w="full">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg={bgColor} minH="100vh">
        <Container maxW="7xl" py={20}>
          <Center h="60vh">
            <VStack spacing={6} textAlign="center">
              <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                borderRadius="xl"
                maxW="md"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Unable to load articles
                </AlertTitle>
                <AlertDescription maxWidth="sm" fontSize="md">
                  We're having trouble connecting to our servers. Please check your internet connection and try again.
                </AlertDescription>
              </Alert>
              <Button
                colorScheme="orange"
                onClick={() => refetch()}
                size="lg"
                borderRadius="xl"
                leftIcon={<Icon as={FaHome} />}
              >
                Try Again
              </Button>
            </VStack>
          </Center>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh">
      <MotionContainer 
        maxW="7xl" 
        py={20} 
        px={{ base: 6, md: 8 }}
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={shouldReduceMotion ? {} : { opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced Header */}
        <VStack spacing={12} align="center" mb={16}>
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <VStack spacing={4}>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                textAlign="center"
                bgGradient="linear(to-r, orange.400, orange.600, orange.500)"
                bgClip="text"
                fontWeight="black"
                letterSpacing="tight"
                lineHeight="shorter"
              >
                AI4Bharat Blog's              </Heading>
              <Box w="100px" h="4px" bg="orange.400" borderRadius="full" />
            </VStack>
          </motion.div>
          
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              maxW="4xl"
              textAlign="center"
              color={textColor}
              lineHeight="relaxed"
              fontWeight="medium"
            >
              Discover cutting-edge research, insights, and innovations from the AI4Bharat community. 
              Explore our latest work in AI for Indian languages and beyond.
            </Text>
          </motion.div>
        </VStack>

        {/* Search and Filter */}
        {blogList && blogList.length > 0 && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              totalCount={filteredBlogs.length}
            />
          </motion.div>
        )}

        {/* Blog Grid */}
        {blogList && blogList.length > 0 ? (
          filteredBlogs.length > 0 ? (
            <SimpleGrid columns={gridColumns} spacing={8} w="full">
              <AnimatePresence mode="wait">
                {filteredBlogs.map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
                ))}
              </AnimatePresence>
            </SimpleGrid>
          ) : (
            <Center py={20}>
              <VStack spacing={6} textAlign="center">
                <Box
                  w={20}
                  h={20}
                  borderRadius="full"
                  bg="orange.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FaSearch} fontSize="3xl" color="orange.400" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="lg" color={headingColor}>
                    No articles found
                  </Heading>
                  <Text color={textColor} maxW="md">
                    We couldn't find any articles matching "{searchTerm}". 
                    Try adjusting your search terms or browse all articles.
                  </Text>
                </VStack>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  borderRadius="xl"
                >
                  Clear Search
                </Button>
              </VStack>
            </Center>
          )
        ) : (
          <Center py={20}>
            <VStack spacing={6} textAlign="center">
              <Box
                w={20}
                h={20}
                borderRadius="full"
                bg="orange.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaBookOpen} fontSize="3xl" color="orange.400" />
              </Box>
              <VStack spacing={2}>
                <Heading size="lg" color={headingColor}>
                  Coming Soon
                </Heading>
                <Text color={textColor} maxW="md" textAlign="center">
                  We're working on bringing you amazing research content. 
                  Check back soon for the latest insights and innovations from AI4Bharat.
                </Text>
              </VStack>
            </VStack>
          </Center>
        )}
      </MotionContainer>
    </Box>
  );
}
