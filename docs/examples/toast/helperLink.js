// @flow strict
import { type Node } from 'react';
import { Flex, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
      <Toast
        text="Your address was updated."
        dismissButton={{ onDismiss: () => {} }}
        helperLink={{
          text: 'Go to settings',
          accessibilityLabel: 'Go to settings',
          href: '#',
        }}
      />
    </Flex>
  );
}