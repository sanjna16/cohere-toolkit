'use client';

import React from 'react';

import { FileError } from '@/components/FileError';
import { Button, Text } from '@/components/Shared';
import { useExperimentalFeatures } from '@/hooks/experimentalFeatures';
import { useUnauthedTools } from '@/hooks/tools';
import { useFilesStore } from '@/stores';
import { cn } from '@/utils';

type Props = { className?: string };
/**
 * @description Renders an error message under the composer. Right now it is only for file upload
 * errors.
 */
export const ComposerError: React.FC<Props> = ({ className = '' }) => {
  const {
    files: { uploadingFiles },
  } = useFilesStore();
  const { data: experimentalFeatures } = useExperimentalFeatures();
  const isAgentsModeOn = !!experimentalFeatures?.USE_AGENTS_VIEW;
  const { unauthedTools } = useUnauthedTools();
  const latestFile = uploadingFiles[uploadingFiles.length - 1];
  // Only use the first tool that requires auth for now since it is unclear how to handle multiple tools
  const unauthedTool = unauthedTools[0];

  if (!!unauthedTool && isAgentsModeOn) {
    return (
      <Text className="mt-2 text-danger-350">
        You need to connect {unauthedTool.display_name} before you can use this tool. Authenticate{' '}
        <Button onClick={() => alert('TBD')} className="underline" label="here" theme="danger" />.
      </Text>
    );
  }
  return (
    <FileError
      error={latestFile?.error}
      file={latestFile?.file}
      className={cn('min-h-[14px]', className)}
    />
  );
};
