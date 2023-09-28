export interface pickedDataProps {
  id: string;
  name: string;
  reps: string[];
  kg: string[];
  createdAt: string;
  creatorId: string;
}
[];

export interface RecordingProps {
  name: string;
  sub: string;
  type: string;
  url: string;
}
[];

export interface TypeDatas {
  type: string;
  sub: string;
  name: string;
  url: string;
}
[];

export interface UserInfo {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface Message {
  senderId: string;
  text: string;
  time: string;
  date: string;
  img?: string;
}
