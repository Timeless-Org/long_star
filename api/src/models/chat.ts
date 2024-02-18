import { prisma } from "../app";
import { IAllChat, IChat, IChatWithMessage } from "../utils/interfaces";

// Chat

export const createChatModel = async (address: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });
  if (!user) return false;
  const chat = await prisma.chat.create({
    data: {
      user_id: user.id,
      created_at: new Date(),
    },
  });
  if (chat) return true;
  return false;
};

export const getChatModel = async (address: string): Promise<IChatWithMessage | null> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });

  const chat = await prisma.chat.findUnique({
    where: {
      user_id: user?.id,
    },
    include: {
      Messages: true,
      User: true,
    },
  });

  if (!chat || !chat.User) {
    return null;
  }
  return chat;
};

export const getUserAllChatModel = async (address: string): Promise<IAllChat[]> => {
  const chat = await prisma.chat.findMany({
    where: {
      User: {
        address: address,
      },
    },
    include: {
      User: {
        select: {
          name: true,
          icon: true,
          key_price: true,
        },
      },
    },
  });
  return chat;
};

export const getLastestChatModel = async (): Promise<IChat[]> => {
  const latestMessages = await prisma.message.findMany({
    take: 50,
    orderBy: {
      created_at: "desc",
    },
    select: {
      chat_id: true,
    },
    distinct: ["chat_id"],
  });

  // chat_id のリストを作成
  const chatIds = latestMessages.map((message) => message.chat_id);

  // それらの chat_id に対応する Chat レコードを取得
  const chats = await prisma.chat.findMany({
    where: {
      id: {
        in: chatIds,
      },
    },
    include: {
      User: true,
    },
  });
  return chats;
};
