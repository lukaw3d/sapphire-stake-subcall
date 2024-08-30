import * as oasis from '@oasisprotocol/client'
import * as oasisRT from '@oasisprotocol/client-rt'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useQuery } from '@tanstack/react-query'
import * as cborg from 'cborg'
import { AbiCoder } from 'ethers'
import { useState } from 'react'
import { useAccount, useSendTransaction } from 'wagmi'
import { parseGrpc } from './parseGrpc.js'

function App() {
  const sapphireAccount = useAccount()
  const sapphireAddress = sapphireAccount.address
  const { sendTransactionAsync } = useSendTransaction()
  const [stakeAmountRaw, setStakeAmount] = useState('100')
  const stakeAmount = BigInt(stakeAmountRaw)
  const [validatorAddress, setValidatorAddress] = useState('oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c')
  const [unstakeSharesRaw, setUnstakeShares] = useState('10000000000')
  const unstakeShares = BigInt(unstakeSharesRaw)

  const balanceQuery = useQuery({
    enabled: !!sapphireAddress,
    queryKey: [sapphireAddress],
    queryFn: async () => {
      if (!sapphireAddress) return
      const address = await oasis.address.fromData(
        oasisRT.address.V0_SECP256K1ETH_CONTEXT_IDENTIFIER,
        oasisRT.address.V0_SECP256K1ETH_CONTEXT_VERSION,
        oasis.misc.fromHex(sapphireAddress.replace('0x', '')),
      )
      const sapphireConfig = {
        mainnet: {
          address: 'oasis1qrd3mnzhhgst26hsp96uf45yhq6zlax0cuzdgcfc',
          runtimeId: '000000000000000000000000000000000000000000000000f80306c9858e7279',
        },
        testnet: {
          address: 'oasis1qqczuf3x6glkgjuf0xgtcpjjw95r3crf7y2323xd',
          runtimeId: '000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c',
        },
      }
      const testnetNic = new oasis.client.NodeInternal('https://testnet.grpc.oasis.dev')
      const consensusAccountsWrapper = new oasisRT.consensusAccounts.Wrapper(
        oasis.misc.fromHex(sapphireConfig.testnet.runtimeId),
      )

      const balance = await consensusAccountsWrapper.queryBalance().setArgs({ address: address }).query(testnetNic)
      const delegations = await consensusAccountsWrapper
        .query('consensus.Delegations')
        .setArgs({ from: address })
        .query(testnetNic)
      const undelegations = await consensusAccountsWrapper
        .query('consensus.Undelegations')
        .setArgs({ to: address })
        .query(testnetNic)

      return parseGrpc({
        balance,
        delegations,
        undelegations,
      })
    },
    refetchInterval: 6000,
  })
  let delegateData: string | undefined
  let undelegateData: string | undefined

  try {
    const coder = AbiCoder.defaultAbiCoder()
    delegateData = coder.encode(
      ['string', 'bytes'],
      [
        'consensus.Delegate',
        cborg.encode({
          amount: [oasis.quantity.fromBigInt(stakeAmount * 10n ** 18n), oasisRT.token.NATIVE_DENOMINATION],
          to: oasis.staking.addressFromBech32(validatorAddress),
        }),
      ],
    )
    undelegateData = coder.encode(
      ['string', 'bytes'],
      [
        'consensus.Undelegate',
        cborg.encode({
          shares: oasis.quantity.fromBigInt(unstakeShares),
          from: oasis.staking.addressFromBech32(validatorAddress),
        }),
      ],
    )
  } catch (err) {}

  async function stake() {
    await sendTransactionAsync({
      to: '0x0100000000000000000000000000000000000103',
      data: delegateData as '0x...',
    })
  }
  async function unstake() {
    await sendTransactionAsync({
      to: '0x0100000000000000000000000000000000000103',
      data: undelegateData as '0x...',
    })
  }

  return (
    <pre>
      <div>
        <ConnectButton />
      </div>
      <hr />
      <div>
        Stake amount{' '}
        <input type="number" step="1" value={stakeAmountRaw} onChange={(e) => setStakeAmount(e.target.value)} />
      </div>
      <div>
        Validator <input type="text" size={60} value={validatorAddress} onChange={(e) => setValidatorAddress(e.target.value)} />
      </div>
      <div>Data: {delegateData}</div>
      <br />
      <button type="button" disabled={!sapphireAddress || !delegateData} onClick={stake}>
        stake
      </button>
      {stakeAmount.toString()} TEST to {validatorAddress}
      <br />
      <hr />
      <br />
      Unstake shares{' '}
      <input type="number" step="1" value={unstakeSharesRaw} onChange={(e) => setUnstakeShares(e.target.value)} />
      <br />
      Validator <input type="text" size={60} value={validatorAddress} onChange={(e) => setValidatorAddress(e.target.value)} />
      <br />
      Data:
      <br />
      {undelegateData}
      <br />
      <button type="button" disabled={!sapphireAddress || !undelegateData} onClick={unstake}>
        unstake
      </button>
      {(unstakeShares / 10n ** 9n).toString()} gigashares from {validatorAddress}
      <br />
      <hr />
      <br />
      {balanceQuery.isFetching ? 'refetching' : ''}
      <br />
      <pre>
        grpc balances
        {JSON.stringify(balanceQuery.data, null, 2)}
      </pre>
      see also{' '}
      <a href={`https://explorer.dev.oasis.io/testnet/sapphire/address/${sapphireAddress}/events#events`}>
        Nexus Account events
      </a>

      <br />
      <br />
      <br />
      <a href="https://github.com/lukaw3d/sapphire-stake-subcall/blob/master/src/App.tsx#L72-L110">source code</a>
    </pre>
  )
}

export default App
