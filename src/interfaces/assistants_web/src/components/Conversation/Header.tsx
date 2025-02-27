'use client';

import { IconButton } from '@/components/IconButton';
import { ShareModal } from '@/components/ShareModal';
import { Button, Icon, Logo, Text } from '@/components/Shared';
import { useContextStore } from '@/context';
import { env } from '@/env.mjs';
import { useAgent } from '@/hooks/agents';
import { useBrandedColors } from '@/hooks/brandedColors';
import { useConversationStore, useSettingsStore } from '@/stores';
import { cn } from '@/utils';

type Props = {
  agentId?: string;
};

export const Header: React.FC<Props> = ({ agentId }) => {
  const {
    conversation: { id },
  } = useConversationStore();
  const { setAgentsLeftSidePanelOpen, setAgentsRightSidePanelOpen } = useSettingsStore();
  const { data: agent, isLoading } = useAgent({ agentId });
  const { open } = useContextStore();
  const { text, fill } = useBrandedColors(agentId);

  const handleOpenShareModal = () => {
    if (!id) return;
    open({
      title: 'Share link to conversation',
      content: <ShareModal conversationId={id} />,
    });
  };

  const handleOpenLeftSidePanel = () => {
    setAgentsLeftSidePanelOpen(true);
  };

  const handleOpenRightSidePanel = () => {
    setAgentsRightSidePanelOpen(true);
  };

  return (
    <div className="flex h-header w-full min-w-0 items-center">
      <div className="flex w-full flex-1 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={handleOpenLeftSidePanel} className="flex items-center gap-4">
            {agentId ? (
              <Text className="uppercase" styleAs="p-lg">
                {agent?.name[0]}
              </Text>
            ) : (
              <Logo hasCustomLogo={env.NEXT_PUBLIC_HAS_CUSTOM_LOGO} includeBrandName={false} />
            )}
            <Text className="truncate dark:text-mushroom-950" styleAs="p-lg" as="span">
              {isLoading ? '' : agent?.name ?? 'Cohere AI'}
            </Text>
          </button>
          {agentId && (
            <Text
              styleAs="label-sm"
              className={cn(
                'rounded bg-mushroom-950 px-2  py-1 font-bold uppercase dark:bg-volcanic-200',
                text
              )}
            >
              Private
            </Text>
          )}
        </div>
        <section className="flex items-center gap-4">
          {id && (
            <Button
              kind="secondary"
              className="[&>div]:gap-x-0 md:[&>div]:gap-x-3"
              label={<Text className={cn(text, 'hidden md:flex')}>Share</Text>}
              iconOptions={{
                customIcon: <Icon name="share" kind="outline" className={fill} />,
              }}
              iconPosition="start"
              onClick={handleOpenShareModal}
            />
          )}
          <IconButton
            iconName="kebab"
            iconClassName={fill}
            onClick={handleOpenRightSidePanel}
            className="flex h-auto w-auto md:hidden"
          />
        </section>
      </div>
    </div>
  );
};
