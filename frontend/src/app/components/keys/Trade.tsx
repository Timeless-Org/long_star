import Image from "next/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const getRandomInt = () => {
  return (Math.floor(Math.random() * 3) + 1).toString();
};

interface ITrade {
  key: number;
  tradeUser: IconProp;
  objectUser: IconProp;
  tradeUserName: string;
  objectUserName: string;
  timestamp: string;
  amount: number;
  value: number;
  kingMark: boolean;
  isBuy: boolean;
}

const Trade = ({
  key,
  tradeUser,
  objectUser,
  tradeUserName,
  objectUserName,
  timestamp,
  amount,
  value,
  kingMark,
  isBuy,
}: ITrade) => {
  return (
    <div
      className="flex justify-start space-x-12 w-full items-center my-3"
      key={key}
    >
      <div className="flex items-center -z-10">
        <Image
          src={`/static/img/user/user${getRandomInt()}.png`}
          alt="user"
          className="rounded-full relative"
          width={48}
          height={48}
        />
        <Image
          src={`/static/img/user/user${getRandomInt()}.png`}
          alt="user"
          className="rounded-full absolute left-12"
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col items-start justify-center space-y-1">
        <div className="inline-flex space-x-2 justify-center items-center">
          <p className="font-semibold">{tradeUserName}</p>
          <p className="text-gray80">sold</p>
          <p className="font-semibold">{amount}</p>
          <p className="text-gray80">{objectUserName}</p>
        </div>
        <div className="flex space-x-3">
          <p
            className={`${
              isBuy ? "text-green bg-greenThin" : "text-red bg-redThin"
            } px-2 font-semibold rounded-md`}
          >
            {value} ETH
          </p>
          <p className="text-gray80">{timestamp}h</p>
          <p className="text-gray80">ago</p>
        </div>
      </div>
    </div>
  );
};

export default Trade;