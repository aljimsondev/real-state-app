import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { AlertCircleIcon, File, FilePlus2 } from 'lucide-react';
import Image from 'next/legacy/image';
import { Fragment, HTMLAttributes } from 'react';
import { DropzoneProps, useDropzone } from 'react-dropzone';

interface DragAndDropProps extends DropzoneProps {
  files: File[];
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  showPreview?: boolean;
}

export const acceptedFileType = {
  'image/png': ['.png', '.jpg'],
};

const SIZE_IN_MB = 1;
const MAX_SIZE_IN_BYTES = 1024 * 1024 * SIZE_IN_MB; // 5 MB (5,242,880 bytes)

const MAX_NAME_SIZE = 30; //20 characters

function fileValidator(file: File) {
  //   if (file.name.length > MAX_NAME_SIZE) {
  //     return {
  //       code: 'name-too-large',
  //       message: `Name is larger than ${MAX_NAME_SIZE} characters`,
  //     };
  //   }

  if (file.size > MAX_SIZE_IN_BYTES) {
    return {
      code: 'size-too-large',
      message: `Size is larger than ${SIZE_IN_MB}mb.`,
    };
  }

  return null;
}

function DropZone({
  files = [],
  wrapperProps = {},
  showPreview = false,
  ...rest
}: DragAndDropProps) {
  const { fileRejections, getInputProps, getRootProps } = useDropzone({
    ...rest,
    validator: fileValidator,
    accept: acceptedFileType,
  });
  const file = files?.[0];
  const { className, ...wrapperRest } = wrapperProps;

  const hasFileError = Boolean(fileRejections.length > 0);
  const preview = createPreview(file);

  return (
    <Fragment>
      <div className="relative">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div
            {...wrapperRest}
            className={cn(
              'bg-secondary border-border aria-invalid:border-destructive aria-invalid:bg-destructive/5 flex aspect-square h-full w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed',
              className,
              hasFileError ? 'bg-destructive/5 border-destructive' : '',
            )}
          >
            {file ? (
              showPreview ? (
                <div className="w-full h-full relative">
                  <Image
                    src={preview!}
                    alt="preview"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              ) : (
                <Fragment>
                  <File size={48} className="text-muted-foreground" />
                  <Typography
                    variant="subtitle1"
                    className="text-muted-foreground"
                  >
                    {file.name}
                  </Typography>
                </Fragment>
              )
            ) : (
              <Fragment>
                <FilePlus2 size={48} className="text-muted-foreground" />
                <Typography
                  variant="subtitle1"
                  className="text-muted-foreground"
                >
                  Drag your files here or Click to select!
                </Typography>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      {fileRejections.length > 0 && (
        <Fragment>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>An error occurred!</AlertTitle>
            <AlertDescription>
              <ul className="list-inside list-disc text-sm">
                {fileRejections.map(({ errors }) => {
                  return errors.map((error) => {
                    return <li key={error.code}>{error.message}</li>;
                  });
                })}
              </ul>
            </AlertDescription>
          </Alert>
        </Fragment>
      )}
    </Fragment>
  );
}

export default DropZone;

function createPreview(file: File) {
  if (!file) return;
  const buffer = URL.createObjectURL(file);

  return buffer;
}
