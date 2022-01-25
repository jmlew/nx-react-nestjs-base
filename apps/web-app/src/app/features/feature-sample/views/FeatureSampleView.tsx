import { useParams } from 'react-router-dom';
import { FeatureSampleContainer } from '../containers';

export function FeatureSampleView() {
  const { quoteCode } = useParams();
  return <FeatureSampleContainer quoteCode={quoteCode} />;
}
