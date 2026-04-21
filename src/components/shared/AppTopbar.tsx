import { Avatar, Badge, Box, Flex, HStack, IconButton, Input, InputGroup, Text } from '@chakra-ui/react';
import { Bell, ChevronDown, Menu, Search } from 'lucide-react';

export function AppTopbar() {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={{ base: '4', md: '8' }}
      py="2"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg"
      gap="4"
      flexShrink={0}
    >
      <HStack gap="4" flex="1">
        <IconButton variant="ghost" aria-label="Menu" color="fg.muted">
          <Menu size={22} />
        </IconButton>
        <InputGroup
          flex="1"
          maxW="320px"
          startElement={<Search size={16} color="var(--chakra-colors-fg-subtle)" />}
        >
          <Input placeholder="Search" bg="bg.dim" borderColor="border" />
        </InputGroup>
      </HStack>

      <HStack gap="4">
        <Box position="relative">
          <IconButton variant="ghost" aria-label="Notifications" color="fg.muted">
            <Bell size={22} />
          </IconButton>
          <Badge
            position="absolute"
            top="1"
            right="1"
            minW="4"
            h="4"
            rounded="full"
            bg="brl.danger"
            color="white"
            fontSize="9px"
            fontWeight={700}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px solid"
            borderColor="bg"
            px="0"
          >
            6
          </Badge>
        </Box>
        <HStack gap="2" cursor="pointer">
          <Avatar.Root size="sm" bg="bg.subtle">
            <Avatar.Fallback color="fg.muted" fontWeight={600} fontSize="14px">
              JR
            </Avatar.Fallback>
          </Avatar.Root>
          <Box display={{ base: 'none', md: 'block' }} textAlign="left">
            <Text fontSize="13px" fontWeight={600} color="fg" lineHeight="1.2">
              John R.
            </Text>
            <Text fontSize="11px" color="fg.subtle" lineHeight="1.2">
              Acme Owner
            </Text>
          </Box>
          <Box as={ChevronDown} color="fg.subtle" w="14px" h="14px" />
        </HStack>
      </HStack>
    </Flex>
  );
}
