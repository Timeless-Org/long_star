import { getChatModel, getLastestChatModel, getUserAllChatModel } from "../models/chat";
import { IAllChat, IChat } from "../utils/interfaces";

export const getUserChatService = async (address: string): Promise<IAllChat | null> => {
  const chat: IAllChat | null = await getChatModel(address);
  return chat;
};

export const getUserAllChatService = async (address: string): Promise<IAllChat[]> => {
  const userAllChat: IAllChat[] | null = await getUserAllChatModel(address);
  return userAllChat;
};

export const getLastestChatService = async (): Promise<IChat[]> => {
  const latestChat: IChat[] | null = await getLastestChatModel();
  return latestChat;
};
