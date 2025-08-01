import { useState, useEffect } from 'react';

export interface Speaker {
  id: string;
  name: string;
  isActive: boolean;
  avatar?: string;
}

export interface Audience {
  id: string;
  name: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
}

export interface SpeechHistory {
  id: string;
  speakerId: string;
  speakerName: string;
  content: string;
  timestamp: Date;
  duration: number;
}

export interface DebateRoomState {
  roomId: string;
  title: string;
  topic: string;
  speakers: Speaker[];
  audience: Audience[];
  chatMessages: ChatMessage[];
  speechHistory: SpeechHistory[];
  currentSpeaker: Speaker | null;
  isLoading: boolean;
  isJoined: boolean;
  showJoinModal: boolean;
  userRole: 'speaker' | 'audience' | null;
}

export const useDebateRoom = (roomId: string) => {
  const [state, setState] = useState<DebateRoomState>({
    roomId,
    title: '',
    topic: '',
    speakers: [],
    audience: [],
    chatMessages: [],
    speechHistory: [],
    currentSpeaker: null,
    isLoading: true,
    isJoined: false,
    showJoinModal: false,
    userRole: null,
  });

  // 토론방 정보 로드
  const loadRoomData = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // 실제 API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setState(prev => ({
      ...prev,
      title: 'AI의 미래에 대한 토론',
      topic: '인공지능이 인간의 일자리를 대체할 것인가?',
      speakers: [
        { id: '1', name: '김도현', isActive: true },
        { id: '2', name: '이서연', isActive: false },
        { id: '3', name: '박지훈', isActive: false },
      ],
      audience: [
        { id: '4', name: '정민수' },
        { id: '5', name: '홍길동' },
        { id: '6', name: '조현우' },
        { id: '7', name: '윤서진' },
        { id: '8', name: '최영희' },
      ],
      currentSpeaker: { id: '1', name: '김도현', isActive: true },
      speechHistory: [
        {
          id: '1',
          speakerId: '1', 
          speakerName: '김도현',
          content: '안녕하세요. 오늘 토론 주제인 AI의 미래에 대해 말씀드리겠습니다. 저는 AI가 인간의 일자리를 완전히 대체하기보다는 협력하는 방향으로 발전할 것이라고 생각합니다.',
          timestamp: new Date(Date.now() - 300000),
          duration: 45
        },
        {
          id: '2',
          speakerId: '2',
          speakerName: '이서연', 
          content: '김도현님의 의견에 일부 동의하지만, 제조업이나 단순 반복 업무에서는 이미 AI 대체가 가속화되고 있습니다. 이에 대한 대비책이 필요하다고 봅니다.',
          timestamp: new Date(Date.now() - 240000),
          duration: 32
        }
      ],
      chatMessages: [
        {
          id: '1',
          userId: '4',
          userName: '정민수',
          message: '좋은 주제네요!',
          timestamp: new Date(Date.now() - 120000)
        },
        {
          id: '2', 
          userId: '5',
          userName: '홍길동',
          message: '발언자분들 의견이 흥미롭습니다',
          timestamp: new Date(Date.now() - 60000)
        }
      ],
      isLoading: false,
    }));
  };

  // 토론방 입장 - 관중으로
  const joinAsAudience = () => {
    setState(prev => ({
      ...prev,
      showJoinModal: false,
      isJoined: true,
      userRole: 'audience',
    }));
  };

  // 토론방 입장 - 발화자로
  const joinAsSpeaker = () => {
    setState(prev => ({
      ...prev,
      showJoinModal: false,
      isJoined: true,
      userRole: 'speaker',
    }));
  };

  // 채팅 메시지 전송
  const sendChatMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: '나',
      message,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMessage],
    }));
  };

  // 토론방 나가기
  const leaveRoom = () => {
    const isSpeaker = state.userRole === 'speaker';
    const message = isSpeaker 
      ? '토론을 중단하고 나가시겠습니까?' 
      : '토론방에서 나가시겠습니까?';
    
    if (window.confirm(message)) {
      // 홈페이지로 이동
      window.location.href = '/';
    }
  };

  // 손들기 (관중이 발언 요청)
  const raiseHand = () => {
    // 실제로는 서버에 요청을 보냄
    console.log('손들기 요청');
  };

  useEffect(() => {
    if (roomId && state.showJoinModal) {
      loadRoomData();
    }
  }, [roomId]);

  return {
    ...state,
    actions: {
      joinAsAudience,
      joinAsSpeaker,
      sendChatMessage,
      leaveRoom,
      raiseHand,
    },
  };
};