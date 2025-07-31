import { DebateHeader } from './DebateHeader';
import { SpeakerSection } from './SpeakerSection';
import { AudienceSection } from './AudienceSection';
import { JoinModal } from './JoinModal';
import { useDebateRoom } from '@/hooks/useDebateRoom';

interface DebateRoomProps {
  roomId: string;
}

export const DebateRoom = ({ roomId }: DebateRoomProps) => {
  const { 
    title,
    topic,
    speakers,
    audience,
    currentSpeaker,
    speechHistory,
    chatMessages,
    isLoading,
    showJoinModal,
    isJoined,
    actions
  } = useDebateRoom(roomId);

  const totalParticipants = speakers.length + audience.length;

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <JoinModal
          open={showJoinModal}
          title={title}
          topic={topic}
          participantCount={totalParticipants}
          isLoading={isLoading}
          onJoinAsAudience={actions.joinAsAudience}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* 헤더 */}
      <DebateHeader 
        title={title}
        participantCount={totalParticipants}
        onLeaveRoom={actions.leaveRoom}
      />

      {/* 메인 컨텐츠 */}
      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        {/* 좌측: 발언자 영역 */}
        <div className="flex-1">
          <SpeakerSection 
            speakers={speakers}
            currentSpeaker={currentSpeaker}
            speechHistory={speechHistory}
          />
        </div>

        {/* 우측: 관중 영역 */}
        <div className="w-80">
          <AudienceSection
            audience={audience}
            chatMessages={chatMessages}
            onSendMessage={actions.sendChatMessage}
            onRaiseHand={actions.raiseHand}
          />
        </div>
      </div>
    </div>
  );
};