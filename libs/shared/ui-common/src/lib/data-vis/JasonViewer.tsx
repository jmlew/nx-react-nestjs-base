import ReactJson from 'react-json-view';

import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

interface JsonViewerProps {
  data: object;
  sx?: SxProps;
}

export function JsonViewer({ data, sx }: JsonViewerProps) {
  return (
    <Box sx={sx}>
      <ReactJson
        src={data}
        theme="hopscotch"
        onSelect={false}
        // collapsed={true}
        // collapseStringsAfterLength={15}
        // displayObjectSize={true}
        // enableClipboard={true}
        // indentWidth={4}
        // displayDataTypes={true}
        // iconStyle={'triangle'}
        // shouldCollapse={false}
        // sortKeys={false}
        // quotesOnKeys={true}
        // groupArraysAfterLength={100}
      />
    </Box>
  );
}
