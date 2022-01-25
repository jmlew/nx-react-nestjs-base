import { Route, Routes } from 'react-router-dom';

import { FeatureSampleView } from './views/FeatureSampleView';

export default function DashAssessmentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FeatureSampleView />}>
        <Route path=":quoteCode" element={<FeatureSampleView />} />
      </Route>
    </Routes>
  );
}
