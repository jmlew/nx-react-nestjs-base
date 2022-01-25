import { JsonViewer } from '@shared/components';

interface FeatureSampleProps {
  data: object;
}

export function FeatureSample({ data }: FeatureSampleProps) {
  return <JsonViewer data={data} sx={{ width: '100%', flexGrow: 1 }} />;
}
