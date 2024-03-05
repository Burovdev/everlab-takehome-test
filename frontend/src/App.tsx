import { useState } from 'react';
import UploadFile from './components/UploadFile';
import { getApiUrl } from './utils/api';
import { ResultType } from './common/types';

const App = () => {
  const [results, setResults] = useState<ResultType[]>([]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(getApiUrl('results'), { method: 'POST', body: formData });
    const data = await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    setResults(data);
  };

  return (
    <div>
      <UploadFile handleFileChange={handleUpload} />
      {results.map((result) => {
        return (
          <div key={result.metric.name}>
            {result.metric.name}({result.value}): <b>{result.status}</b>
          </div>
        );
      })}
    </div>
  );
};

export default App;
