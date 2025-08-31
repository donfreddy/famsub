export interface Message {
  id: number;
  name: string;
  avatar: string;
  preview: string;
  chats: Chat[];
}

export interface Chat {
  id: number;
  sender: "me" | "other";
  text: string;
}
