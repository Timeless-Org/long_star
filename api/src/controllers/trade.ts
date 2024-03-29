import { Request, Response } from "express";
import {
  createTradeService,
  getAllTradeService,
  getHolderTradeService,
  getLatestTrade50Service,
  getUserTradeService,
  getWatchlistTradeService,
} from "../services/trade";
import { ITrade } from "../utils/interfaces";

export const createTradeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { buyAddress, sellAddress, keyPrice, amount, isBuy } = req.body;
    const lowerBuyAddress: string = buyAddress.toLowerCase();
    const lowerSellAddress: string = sellAddress.toLowerCase();
    const result = await createTradeService(lowerBuyAddress, lowerSellAddress, keyPrice, amount, isBuy);
    if (result) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.error(`👾 createTradeController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserTradeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const lowerAddress = address.toLowerCase();
    const trades: ITrade[] = await getUserTradeService(lowerAddress);
    res.status(200).json({ trades });
  } catch (err) {
    console.error(`👾 getUserTradeController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getHolderTradeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const trades: ITrade[] = await getHolderTradeService(address);
    res.status(200).json({ trades });
  } catch (err) {
    console.error(`👾 getHolderTradeController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getWatchlistTradeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const lowerAddress = address.toLowerCase();
    const trades: ITrade[] = await getWatchlistTradeService(lowerAddress);
    res.status(200).json({ trades });
  } catch (err) {
    console.error(`👾 getWatchlistTradeController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllTradeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const trades: ITrade[] = await getAllTradeService();
    res.status(200).json({ trades });
  } catch (err) {
    console.error(`👾 getAllTradeController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestTrade50Controller = async (req: Request, res: Response): Promise<void> => {
  try {
    const trades: ITrade[] = await getLatestTrade50Service();
    res.status(200).json({ trades });
  } catch (err) {
    console.error(`👾 getLatestTrade50Controller: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
