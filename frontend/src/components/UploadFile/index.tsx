import { ChangeEvent, FC, useRef } from 'react';
import { UploadFileButton } from './styled';
import { UploadFileProps } from './types';

const UploadFile: FC<UploadFileProps> = ({ handleFileChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    handleFileChange(e.target.files[0]);
    e.target.value = '';
  };

  const handleUpload = () => inputRef.current?.click();

  return (
    <div>
      <UploadFileButton onClick={handleUpload}>Upload file</UploadFileButton>
      <input type='file' ref={inputRef} onChange={handleChange} hidden />
    </div>
  );
};

export default UploadFile;
