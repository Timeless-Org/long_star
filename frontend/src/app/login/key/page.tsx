'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import LoadingModal from '@components/Modal/LoadingModal'
import Navigation from '@components/common/Navigation'
import OrangeButton from '@components/common/OrangeButton'
import { blastSepolia } from '@lib/chain'
import { ethersContract } from '@lib/ethersContract'
import { createTrade } from '@utils/api'
import { IAddress } from '@utils/types'

export default function LoginKey() {
  const router = useRouter()
  const { wallets } = useWallets()
  const embeddedWallet = wallets[0]
  const { user } = usePrivy()
  const address = (user?.wallet?.address as IAddress) || '0x'

  const [keyNftBalance, setKeyNftBalance] = useState<number>(0)
  const [isLoadingModalDisplay, setIsLoadingModalDisplay] = useState<boolean>(false)

  const changePrePage = () => {
    router.push('/login/deposit')
  }

  const changeNextPage = async () => {
    try {
      await createTrade(address, address, 0, 1, true)
    } catch (err: any) {}
    router.push('/login/notification')
  }

  const getKeyNftBalance = useCallback(async () => {
    if (embeddedWallet) {
      setIsLoadingModalDisplay(true)
      await embeddedWallet.switchChain(blastSepolia.id)
      const provider = await embeddedWallet.getEthersProvider()
      const { keyNftShareContract } = await ethersContract(provider)
      const keyNftBalance = await keyNftShareContract.sharesBalance(address, address)
      setKeyNftBalance(keyNftBalance)
      setIsLoadingModalDisplay(false)
    }
  }, [address, embeddedWallet])

  const buyKey = async (_address: IAddress) => {
    if (embeddedWallet) {
      setIsLoadingModalDisplay(true)
      await embeddedWallet.switchChain(blastSepolia.id)
      const provider = await embeddedWallet.getEthersProvider()
      const { keyNftShareContract } = await ethersContract(provider)
      const transaction = await keyNftShareContract.buyShares(_address, 1, {
        gasLimit: 2000000
      })
      await transaction.wait()
      setIsLoadingModalDisplay(false)
      getKeyNftBalance()
    }
  }

  const closeErrorModal = () => {
    setIsLoadingModalDisplay(false)
  }

  useEffect(() => {
    if (keyNftBalance === 0) {
      getKeyNftBalance()
    }
  }, [getKeyNftBalance, keyNftBalance])

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col justify-between pb-5 pt-10">
        <LoadingModal isModalDisplay={isLoadingModalDisplay} />
        <div>
          <Navigation changePrePage={changePrePage} progressValue={57.2} pageNum={4} />
          <div className="mt-10 flex w-full flex-col items-start justify-center">
            <p className="text-lg font-semibold">Buy your first key</p>
            <p className="mt-4 text-gray60">
              Everyone has a chat unlocked by their NFT keys. These NFT keys can be bought and sold and their price goes
              up and down based on how many are currently circulating.
              <br />
              <br />
              You can trade keys with 0% trade fees.
              <br />
              <br />
              You&rsquo;ll earn native yield based on your rankings.
              <br />
              <br />
              To create your profile, buy the first key to your own room.
            </p>
          </div>
        </div>

        <div className="mb-10 flex flex-col px-5">
          <OrangeButton
            text={keyNftBalance > 0 ? 'Proceed' : 'Buy Key for $0'}
            buttonAction={keyNftBalance > 0 ? changeNextPage : () => buyKey(address)}
          />
        </div>
      </div>
    </div>
  )
}
