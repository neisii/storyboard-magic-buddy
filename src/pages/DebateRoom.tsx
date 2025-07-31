import { useParams } from 'react-router-dom';
import { DebateRoom as DebateRoomComponent } from '@/components/DebateRoom/DebateRoom';

const DebateRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();

  if (!roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">토론방을 찾을 수 없습니다</h1>
          <p className="text-muted-foreground">올바른 토론방 링크를 확인해주세요.</p>
        </div>
      </div>
    );
  }

  return <DebateRoomComponent roomId={roomId} />;
};

export default DebateRoom;