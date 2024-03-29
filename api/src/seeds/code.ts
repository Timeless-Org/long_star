import { prisma } from "../app";
import { NODE_ENV } from "../utils/config";

const generateUniqueRandomCodes = (length: number, count: number): Set<string> => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codes = new Set<string>();
  while (codes.size < count) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    codes.add(result);
  }
  return codes;
};

const uniqueCodes = generateUniqueRandomCodes(10, 100); // 10桁のコードを100個生成
console.log(uniqueCodes);

export const post = async () => {
  const codes: { code: string; user_id?: number; created_at: string }[] = [
    {
      code: "longstar7",
      user_id: 1,
      created_at: new Date().toISOString(),
    },
  ];
  if (NODE_ENV === "local") {
    codes.push(
      {
        code: "0987654321",
        user_id: 2,
        created_at: new Date().toISOString(),
      },
      {
        code: "ABCDEFGHIJ",
        user_id: 3,
        created_at: new Date().toISOString(),
      },
    );
  } else if (NODE_ENV === "development") {
    codes.push(
      {
        code: "1234567890",
        user_id: 2,
        created_at: new Date().toISOString(),
      },
      {
        code: "ABCDEFGHIJ",
        user_id: 3,
        created_at: new Date().toISOString(),
      },
      {
        code: "abcdefghij",
        user_id: 4,
        created_at: new Date().toISOString(),
      },
      {
        code: "0987654321",
        user_id: 5,
        created_at: new Date().toISOString(),
      },
      {
        code: "abcde12345",
        user_id: 6,
        created_at: new Date().toISOString(),
      },
    );
  }

  const generateCodes = generateUniqueRandomCodes(10, 100);
  for (const generateCode of generateCodes) {
    codes.push({
      code: generateCode,
      created_at: new Date().toISOString(),
    });
  }

  await prisma.code.createMany({
    data: codes,
  });
};
