// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, IconButton, Tooltip } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={4} width={150}>
        <Tooltip idealDirection="right" inline text="Share" accessibilityLabel="">
          <IconButton
            accessibilityLabel="Share this Pin"
            bgColor="white"
            icon="share"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
      </Box>
    </ColorSchemeProvider>
  );
}
