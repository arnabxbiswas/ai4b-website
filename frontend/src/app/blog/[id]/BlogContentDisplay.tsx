"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  VStack,
  Center,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

interface Blog {
  id: number;
  title: string;
  description: string;
  published_on: string;
  image: string | null;
  related_link: string | null;
  markdown_content: string;
}

interface BlogContentDisplayProps {
  blog: Blog;
}

function getReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default function BlogContentDisplay({ blog }: BlogContentDisplayProps) {
  const readingTime = getReadingTime(blog.markdown_content);

  const pageBg = useColorModeValue('orange.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('orange.800', 'orange.200');
  const borderColor = useColorModeValue('orange.200', 'orange.700');
  const linkColor = useColorModeValue('orange.600', 'orange.300');
  const accentColor = useColorModeValue('orange.500', 'orange.400');

  return (
    <Box bg={pageBg} minH="100vh">
      <Box bg={cardBg} borderBottom="1px solid" borderColor={borderColor} py={8} px={4}>
        <Container maxW="container.lg" textAlign="center">
          <VStack spacing={4}>
            <Breadcrumb mb={4} fontSize="sm" color={textColor} separator={<Icon as={FaChevronRight} color={accentColor} mx={1} />}>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href="/" _hover={{ textDecoration: 'underline', color: linkColor }}>
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href="/blog" _hover={{ textDecoration: 'underline', color: linkColor }}>
                  Blog
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Text color={accentColor} isTruncated maxW={{ base: '150px', sm: '300px' }}>
                  {blog.title}
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading as="h1" size={{ base: 'xl', md: '2xl' }} color={headingColor} mt={4}>
              {blog.title}
            </Heading>
            <Text color={textColor} fontSize="md" suppressHydrationWarning>
              Published on{' '}
              {new Date(blog.published_on).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              &bull; {readingTime}
            </Text>
          </VStack>
        </Container>
      </Box>

      {blog.image && (
        <Box my={8}>
          <Container maxW="container.lg">
            <Center>
              <Box
                boxShadow="xl"
                border="2px solid"
                borderColor={borderColor}
                borderRadius="md"
                overflow="hidden"
                w="full"
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  quality={80}
                  priority
                  width={1200}
                  height={600}
                  style={{ objectFit: "cover", width: '100%', height: 'auto', maxHeight: '600px' }}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </Box>
            </Center>
          </Container>
        </Box>
      )}

      <Container maxW="container.lg" my={12} px={4}>
        <Box
          bg={cardBg}
          p={{ base: 6, sm: 8 }}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="xl"
        >
          <Button
            as={Link}
            href="/blog"
            variant="ghost"
            colorScheme="orange"
            leftIcon={<Icon as={FaChevronRight} transform="rotate(180deg)" />}
            mb={6}
            size="sm"
            _hover={{ bg: 'orange.50' }}
          >
            Back to all articles
          </Button>

          <Box
            className="prose"
            sx={{
              maxW: '80ch',
              mx: 'auto',
              color: textColor,
              lineHeight: 'tall',
              fontSize: { base: 'md', md: 'lg' },

              'h1, h2, h3, h4, h5, h6': {
                color: headingColor,
                mt: { base: 8, md: 10 },
                mb: { base: 4, md: 5 },
                lineHeight: 'shorter',
                fontWeight: 'bold',
              },
              h1: { fontSize: { base: '2xl', md: '3xl' } },
              h2: { fontSize: { base: 'xl', md: '2xl' } },
              h3: { fontSize: { base: 'lg', md: 'xl' } },
              h4: { fontSize: { base: 'md', md: 'lg' } },

              p: { mb: 4 },

              a: {
                color: linkColor,
                textDecoration: 'underline',
                _hover: { textDecoration: 'none', color: accentColor },
              },

              blockquote: {
                borderLeft: '4px solid',
                borderColor: accentColor,
                pl: 4,
                py: 1,
                my: 6,
                fontStyle: 'italic',
                color: textColor,
              },

              'ul, ol': { ml: 5, mb: 4 },
              li: { mb: 2 },

              img: {
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 'md',
                boxShadow: 'md',
                my: 6,
              },

              pre: {
                bg: useColorModeValue('gray.100', 'gray.800'),
                p: 4,
                borderRadius: 'md',
                overflowX: 'auto',
                fontSize: 'sm',
                my: 6,
                border: '1px solid',
                borderColor: borderColor,
              },
              'code:not(pre > code)': {
                bg: useColorModeValue('orange.50', 'orange.900'),
                px: 1.5,
                py: 0.5,
                borderRadius: 'sm',
                fontSize: 'sm',
                color: useColorModeValue('orange.700', 'orange.200'),
              },
              'pre > code': {
                background: 'none',
                padding: 0,
                color: 'inherit',
                fontSize: 'inherit',
              },

              table: {
                width: '100%',
                borderCollapse: 'collapse',
                my: 6,
              },
              'th, td': {
                border: '1px solid',
                borderColor: borderColor,
                p: 3,
                textAlign: 'left',
              },
              th: {
                bg: useColorModeValue('orange.100', 'orange.800'),
                fontWeight: 'semibold',
              },
            }}
          >
            <ReactMarkdown>{blog.markdown_content}</ReactMarkdown>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
