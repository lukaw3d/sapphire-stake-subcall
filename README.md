```js
harry code:
  const coder = AbiCoder.defaultAbiCoder();
  const doop = await provider.call({
    to: '0x0100000000000000000000000000000000000103',
    data: coder.encode(["string", "bytes"], ["core.CallDataPublicKey", cborg.encode(null)])
  });
  const [subcall_status, subcall_data] = coder.decode(["uint", "bytes"], doop);
  console.log('Result', subcall_status, cborg.decode(getBytes(subcall_data)));

will it work in metamask? theres no provider.call?
node a.mjs
  import { AbiCoder } from 'ethers'
  import * as cborg from 'cborg'
  const coder = AbiCoder.defaultAbiCoder();
  console.log(cborg.encode(null)) // Uint8Array(1) [ 246 ]
  console.log(coder.encode(["string", "bytes"], ["core.CallDataPublicKey", cborg.encode(null)]))
  // 0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000016636f72652e43616c6c446174615075626c69634b6579000000000000000000000000000000000000000000000000000000000000000000000000000000000001f600000000000000000000000000000000000000000000000000000000000000

input into https://docs.metamask.io/wallet/reference/eth_call/?Transaction[to]=0x0100000000000000000000000000000000000103&Transaction[input]=0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000016636f72652e43616c6c446174615075626c69634b6579000000000000000000000000000000000000000000000000000000000000000000000000000000000001f600000000000000000000000000000000000000000000000000000000000000&Block=latest
does return something
// 0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c1a26565706f63681987696a7075626c69635f6b6579a4636b65795820275b01d6fb810444ab154d14bcdeec1bf6a5fb142e24bd2ba48639e757a81a5a68636865636b73756d582059dd7e7188b9736897ca719ece9dce6d9618e3f487553dccbc601ba848b65d9c697369676e61747572655840ab13d0d9bebf164cdb87b13a1067931f6c9bd402942f8565025cfeeb9809edfb3fe1a609d26b82693f8e264cdb073d01d50fe4010c844d283b529802b522170d6a65787069726174696f6e19877300000000000000000000000000000000000000000000000000000000000000
  {
    const [subcall_status, subcall_data] = coder.decode(["uint", "bytes"], '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c1a26565706f63681987696a7075626c69635f6b6579a4636b65795820275b01d6fb810444ab154d14bcdeec1bf6a5fb142e24bd2ba48639e757a81a5a68636865636b73756d582059dd7e7188b9736897ca719ece9dce6d9618e3f487553dccbc601ba848b65d9c697369676e61747572655840ab13d0d9bebf164cdb87b13a1067931f6c9bd402942f8565025cfeeb9809edfb3fe1a609d26b82693f8e264cdb073d01d50fe4010c844d283b529802b522170d6a65787069726174696f6e19877300000000000000000000000000000000000000000000000000000000000000');
    console.log({subcall_status, subcall_data})
    console.log('cborg.decode(getBytes(subcall_data))', cborg.decode(getBytes(subcall_data)));
    /*
    {
      subcall_status: 0n,
      subcall_data: '0xa26565706f63681987696a7075626c69635f6b6579a4636b65795820275b01d6fb810444ab154d14bcdeec1bf6a5fb142e24bd2ba48639e757a81a5a68636865636b73756d582059dd7e7188b9736897ca719ece9dce6d9618e3f487553dccbc601ba848b65d9c697369676e61747572655840ab13d0d9bebf164cdb87b13a1067931f6c9bd402942f8565025cfeeb9809edfb3fe1a609d26b82693f8e264cdb073d01d50fe4010c844d283b529802b522170d6a65787069726174696f6e198773'
    }
    cborg.decode(getBytes(subcall_data)) {
      epoch: 34665,
      public_key: {
        key: Uint8Array(32) [
          39,  91,   1, 214, 251, 129,   4, 68,
          171,  21,  77,  20, 188, 222, 236, 27,
          246, 165, 251,  20,  46,  36, 189, 43,
          164, 134,  57, 231,  87, 168,  26, 90
        ],
        checksum: Uint8Array(32) [
          89, 221, 126, 113, 136, 185, 115,
          104, 151, 202, 113, 158, 206, 157,
          206, 109, 150,  24, 227, 244, 135,
          85,  61, 204, 188,  96,  27, 168,
          72, 182,  93, 156
        ],
        signature: Uint8Array(64) [
          171,  19, 208, 217, 190, 191,  22,  76, 219, 135, 177,
          58,  16, 103, 147,  31, 108, 155, 212,   2, 148,  47,
          133, 101,   2,  92, 254, 235, 152,   9, 237, 251,  63,
          225, 166,   9, 210, 107, 130, 105,  63, 142,  38,  76,
          219,   7,  61,   1, 213,  15, 228,   1,  12, 132,  77,
          40,  59,  82, 152,   2, 181,  34,  23,  13
        ],
        expiration: 34675
      }
    }
    */
  }

will it work as transactions?
https://docs.metamask.io/wallet/reference/eth_sendtransaction/?Transaction[to]=0x0100000000000000000000000000000000000103&Transaction[from]=0xC3ecf872F643C6238Aa20673798eed6F7dA199e9&Transaction[data]=0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000016636f72652e43616c6c446174615075626c69634b6579000000000000000000000000000000000000000000000000000000000000000000000000000000000001f600000000000000000000000000000000000000000000000000000000000000
does make a transaction
0x3b4835937720a6fae945c7932b6d86e281b85e4fce2152269d9c1e5358b602e0
  > https://explorer.dev.oasis.io/testnet/sapphire/tx/0x3b4835937720a6fae945c7932b6d86e281b85e4fce2152269d9c1e5358b602e0
  > 0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000016636f72652e43616c6c446174615075626c69634b6579000000000000000000000000000000000000000000000000000000000000000000000000000000000001f600000000000000000000000000000000000000000000000000000000000000

node
  import { AbiCoder, getBytes, getDefaultProvider } from 'ethers'
  import * as cborg from 'cborg'
  import * as oasis from '@oasisprotocol/client';
  import * as oasisRT from '@oasisprotocol/client-rt';

  (async () => {
    console.log(cborg.encode(null))
    // Uint8Array(1) [ 246 ]
    const coder = AbiCoder.defaultAbiCoder();
    console.log(coder.encode(["string", "bytes"], ["core.CallDataPublicKey", cborg.encode(null)]))
    // 0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000016636f72652e43616c6c446174615075626c69634b6579000000000000000000000000000000000000000000000000000000000000000000000000000000000001f600000000000000000000000000000000000000000000000000000000000000

    {
      const [subcall_status, subcall_data] = coder.decode(["uint", "bytes"], '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c1a26565706f63681987696a7075626c69635f6b6579a4636b65795820275b01d6fb810444ab154d14bcdeec1bf6a5fb142e24bd2ba48639e757a81a5a68636865636b73756d582059dd7e7188b9736897ca719ece9dce6d9618e3f487553dccbc601ba848b65d9c697369676e61747572655840ab13d0d9bebf164cdb87b13a1067931f6c9bd402942f8565025cfeeb9809edfb3fe1a609d26b82693f8e264cdb073d01d50fe4010c844d283b529802b522170d6a65787069726174696f6e19877300000000000000000000000000000000000000000000000000000000000000');
      console.log({subcall_status, subcall_data})
      console.log('cborg.decode(getBytes(subcall_data))', cborg.decode(getBytes(subcall_data)));
    }

    console.log('consensus.Delegate', coder.encode(["string", "bytes"], ["consensus.Delegate", cborg.encode({
      amount: [oasis.quantity.fromBigInt(100n * (10n**18n)), oasisRT.token.NATIVE_DENOMINATION],
      to: oasis.staking.addressFromBech32('oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c'), // Princess Stake on testnet
    })]))
    // https://docs.metamask.io/wallet/reference/eth_sendtransaction/?Transaction[to]=0x0100000000000000000000000000000000000103&Transaction[from]=0xC3ecf872F643C6238Aa20673798eed6F7dA199e9&Transaction[data]=0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000012636f6e73656e7375732e44656c65676174650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002da262746f55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf66616d6f756e748249056bc75e2d631000004000000000000000000000000000000000000000

    console.log('consensus.Undelegate', coder.encode(["string", "bytes"], ["consensus.Undelegate", cborg.encode({
      shares: [oasis.quantity.fromBigInt(2n * (10n**9n)), oasisRT.token.NATIVE_DENOMINATION],
      from: oasis.staking.addressFromBech32('oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c'), // Princess Stake on testnet
    })]))
    // https://docs.metamask.io/wallet/reference/eth_sendtransaction/?Transaction[to]=0x0100000000000000000000000000000000000103&Transaction[from]=0xC3ecf872F643C6238Aa20673798eed6F7dA199e9&Transaction[data]=0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000014636f6e73656e7375732e556e64656c6567617465000000000000000000000000000000000000000000000000000000000000000000000000000000000000002aa26466726f6d55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf667368617265738244773594004000000000000000000000000000000000000000000000
    // no event in next block. probably failed

    console.log('consensus.Undelegate 2', coder.encode(["string", "bytes"], ["consensus.Undelegate", cborg.encode({
      shares: oasis.quantity.fromBigInt(2n * (10n**9n)),
      from: oasis.staking.addressFromBech32('oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c'), // Princess Stake on testnet
    })]))
    // https://docs.metamask.io/wallet/reference/eth_sendtransaction/?Transaction[to]=0x0100000000000000000000000000000000000103&Transaction[from]=0xC3ecf872F643C6238Aa20673798eed6F7dA199e9&Transaction[data]=0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000014636f6e73656e7375732e556e64656c65676174650000000000000000000000000000000000000000000000000000000000000000000000000000000000000028a26466726f6d55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf667368617265734477359400000000000000000000000000000000000000000000000000

    const provider = window.ethereum
    const doop = await provider.call({
      to: '0x0100000000000000000000000000000000000103',
      data: coder.encode(["string", "bytes"], ["core.CallDataPublicKey", cborg.encode(null)])
    });
    const [subcall_status, subcall_data] = coder.decode(["uint", "bytes"], doop);
    console.log('Result', subcall_status, cborg.decode(getBytes(subcall_data)));
  })()



okay, consensus.Delegate...
  tx format?
    https://github.com/oasisprotocol/cli/blob/5ee5605b0aaa61e5221f8646eee797a94e706179/cmd/account/delegate.go#L68
      To:     *toAddr,
      Amount: *amountBaseUnits,
    https://github.com/oasisprotocol/oasis-sdk/blob/22b89224fbce558c6cb1088d9b30e552a61ba64f/tools/gen_runtime_vectors/main.go#L215
      To:     *to,
      Amount: types.NewBaseUnits(*quantity.NewFromUint64(amt), types.NativeDenomination),
        BaseUnits{
          Amount:       amount,
          Denomination: denomination,
        }

  cbor encoding?
    https://github.com/oasisprotocol/sapphire-paratime/blob/d8246ee179e3f49e5a321a1a79dd340f6fdb571c/contracts/contracts/Subcall.sol#L111
    subcall
      SUBCALL.call(
        abi.encode(method, body)
      );
    _subcallWithToAndAmount
      subcall(
        method,
        abi.encodePacked(
            hex"a262",
            "to",
            hex"55",
            to,
            hex"66",
            "amount",
            hex"8250",
            value,
            uint8(0x40 + token.length),
            token
        )
      );
    string private constant CONSENSUS_DELEGATE = "consensus.Delegate";
    string private constant CONSENSUS_UNDELEGATE = "consensus.Undelegate";
    string private constant CONSENSUS_WITHDRAW = "consensus.Withdraw";
    (status, data) = _subcallWithToAndAmount(
        CONSENSUS_DELEGATE,
        to,
        amount,
        ""
    );

    no consensus.Deposit?
    what is hex"a262", hex"8250",
      https://cbor.me/
      [1,2] generates 820102
      {"a":5,"b":6} generates A2616105616206

      undelegate code has comments
        (uint64 status, bytes memory data) = subcall(
          CONSENSUS_UNDELEGATE,
          abi.encodePacked( // CBOR encoded, {'from': x, 'shares': y}
              hex"a2", // map, 2 pairs
              // pair 1
              hex"64", // UTF-8 string, 4 bytes
              "from",
              hex"55", // 21 bytes
              from,
              // pair 2
              hex"66", // UTF-8 string, 6 bytes
              "shares",
              hex"50", // 128bit unsigned int (16 bytes)
              shares
          )
        );
      should I string concatenate like this, or hope cborg.encode({to: 'oasis1', amount: 1}) works?
      console.log(coder.encode(["string", "bytes"], ["core.CallDataPublicKey", cborg.encode({to: 'oasis1', amount: 1})]))
        // 0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000016636f72652e43616c6c446174615075626c69634b6579000000000000000000000000000000000000000000000000000000000000000000000000000000000013a262746f666f617369733166616d6f756e740100000000000000000000000000
        contains a262
        no 8250
      depositing in consensus: https://github.com/oasisprotocol/wallet/blob/899efa53d848a180e46a184bc12f2868eeedde40/src/app/lib/transaction.ts#L156-L162
        new oasisRT.consensusAccounts.Wrapper(oasis.misc.fromHex(runtime.id)).callDeposit()
        .setBody({
          amount: [
            oasis.quantity.fromBigInt(BigInt(parseRoseStringToBigNumber(amount, runtime.decimals).toFixed(0))),
            oasisRT.token.NATIVE_DENOMINATION,
          ],
          to: oasis.staking.addressFromBech32(
            isValidEthAddress(targetAddress) ? await getEvmBech32Address(targetAddress) : targetAddress,
          ),
        })

    what parses the abi encoded thing?
      https://github.com/oasisprotocol/oasis-sdk/blob/22b89224fbce558c6cb1088d9b30e552a61ba64f/runtime-sdk/modules/evm/src/precompile/subcall.rs#L48-L54
      https://github.com/oasisprotocol/oasis-sdk/blob/22b89224fbce558c6cb1088d9b30e552a61ba64f/runtime-sdk/modules/evm/src/precompile/subcall.rs#L80
      https://github.com/oasisprotocol/oasis-sdk/blob/22b89224fbce558c6cb1088d9b30e552a61ba64f/runtime-sdk/src/modules/consensus_accounts/mod.rs#L464
      https://github.com/oasisprotocol/oasis-sdk/blob/22b89224fbce558c6cb1088d9b30e552a61ba64f/runtime-sdk/src/modules/consensus_accounts/types.rs#L29-L33

  console.log('consensus.Delegate', coder.encode(["string", "bytes"], ["consensus.Delegate", cborg.encode({
    amount: [oasis.quantity.fromBigInt(100n * (10n**18n)), oasisRT.token.NATIVE_DENOMINATION],
    to: oasis.staking.addressFromBech32('oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c'), // Princess Stake on testnet
  })]))
  // 0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000012636f6e73656e7375732e44656c65676174650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002da262746f55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf66616d6f756e748249056bc75e2d631000004000000000000000000000000000000000000000
  https://docs.metamask.io/wallet/reference/eth_sendtransaction/?Transaction[to]=0x0100000000000000000000000000000000000103&Transaction[from]=0xC3ecf872F643C6238Aa20673798eed6F7dA199e9&Transaction[data]=0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000012636f6e73656e7375732e44656c65676174650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002da262746f55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf66616d6f756e748249056bc75e2d631000004000000000000000000000000000000000000000
  did make a transaction
  > https://explorer.dev.oasis.io/testnet/sapphire/tx/0xb3af828203ee50566df6999e2443cfc1db1d221c70c13148ccc7d8e306643af5
  > https://explorer.dev.oasis.io/testnet/sapphire/block/7877526/events#events Tokens burnt

but is it real?
  my balance did decrease
  but tx says Amount 0 TEST
  event says Transfer Amount 100 TEST
  but not deposit

  next block?
  https://explorer.dev.oasis.io/testnet/sapphire/block/7877526/events#events
  Pending Delegation Account  Tokens burnt
  https://explorer.dev.oasis.io/testnet/sapphire/block/7877526/events?page=2
  Delegate to consensus

  Does validator show new delegation?
    https://testnet.oasisscan.com/validators/detail/oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c
    my acc 0xC3ecf872F643C6238Aa20673798eed6F7dA199e9 = oasis1qq235lqj77855qcemcr5w2qm372s4amqcc4v3ztc
    is not on the list of Delegators
    Escrow Events is empty, but shows two pages. Did I break oasisscan Escrow Events?

    another validator https://testnet.oasisscan.com/validators/detail/oasis1qrwncs459lauc77zw23efdn9dmfcp23cxv095l5z
    does show Escrow Events

  https://explorer.dev.oasis.io/testnet/consensus/validators/oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c/delegators#delegators
    shows a delegation from Sapphire at least

  get staked balance
    https://explorer.dev.oasis.io/testnet/sapphire/address/oasis1qq235lqj77855qcemcr5w2qm372s4amqcc4v3ztc
      Balance 226.221542798 TEST
      grpc request returned AAAAAB2hZGRhdGFWoWhiYWxhbmNlc6FASQxDdF6aB54MAA==gAAAAB5ncnBjLXN0YXR1czowDQpncnBjLW1lc3NhZ2U6DQo=
      https://lukaw3d.github.io/oasis-parse-grpc/#AAAAAB2hZGRhdGFWoWhiYWxhbmNlc6FASQxDdF6aB54MAA%3D%3DgAAAAB5ncnBjLXN0YXR1czowDQpncnBjLW1lc3NhZ2U6DQo%3D
      no staked balance
    https://explorer.dev.oasis.io/testnet/consensus/address/oasis1qq235lqj77855qcemcr5w2qm372s4amqcc4v3ztc
      Staked 0 TEST
    https://wallet.dev.oasis.io/account/oasis1qq235lqj77855qcemcr5w2qm372s4amqcc4v3ztc/stake/active-delegations
      switch to testnet
      Staked 0.0 TEST

    consensus grpc?
    node a.mjs
      import oasis from '@oasisprotocol/client'
      import xhr2 from 'xhr2'
      global.XMLHttpRequest = xhr2
      const testnetNic = new oasis.client.NodeInternal('https://testnet.grpc.oasis.dev')
      console.log(await testnetNic.stakingDelegationInfosFor({
        owner: oasis.staking.addressFromBech32('oasis1qq235lqj77855qcemcr5w2qm372s4amqcc4v3ztc'),
        height: 0,
      }))
      // Map(0) {}

    https://github.com/oasisprotocol/oasis-sdk/blob/22b89224fbce558c6cb1088d9b30e552a61ba64f/client-sdk/ts-web/rt/src/consensus_accounts.ts#L39
    https://github.com/search?q=repo%3Aoasisprotocol%2Foasis-sdk%20path%3A%2F%5Eclient-sdk%5C%2Fts-web%5C%2F%2F%20delegations&type=code
      no runtime grpc methods for this?

    Matevžs oasis cli can stake from paratimes. does it display balance?
      https://github.com/oasisprotocol/cli/blob/5ee5605b0aaa61e5221f8646eee797a94e706179/cmd/account/delegate.go#L73
      https://github.com/oasisprotocol/cli/blob/738e56dc4ce1242657d9a559068ce7c9c0e0fc89/cmd/account/show/show.go#L213
      yes. using grpc
      https://github.com/oasisprotocol/oasis-sdk/blob/22b89224fbce558c6cb1088d9b30e552a61ba64f/client-sdk/go/modules/consensusaccounts/consensus_accounts.go#L23-L34

      a lot of these are missing from js sdk
      https://github.com/oasisprotocol/oasis-sdk/blob/22b89224fbce558c6cb1088d9b30e552a61ba64f/client-sdk/ts-web/rt/src/consensus_accounts.ts#L15-L20
      can i call this.query('consensus.Delegations') without fixing it and implementing types?

    node a.mjs
      const testnetNic = new oasis.client.NodeInternal('https://testnet.grpc.oasis.dev')
      const consensusWrapper = new oasisRT.consensusAccounts.Wrapper(oasis.misc.fromHex('000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c'));
      const daveEthAddr = '0xC3ecf872F643C6238Aa20673798eed6F7dA199e9';
      const daveEthAddrU8 = oasis.misc.fromHex(daveEthAddr.slice(2));
      const daveAddr = await oasis.address.fromData(
        oasisRT.address.V0_SECP256K1ETH_CONTEXT_IDENTIFIER,
        oasisRT.address.V0_SECP256K1ETH_CONTEXT_VERSION,
        daveEthAddrU8,
      );
      await consensusWrapper.query('consensus.Delegations').setArgs({from: daveAddr}).query(testnetNic)
      // [{ to: Uint8Array(21) [ 0,  12, 110,  44, 166, 245, 91, 197, 242, 135, 242,  75, 57,  31, 199, 240,   5,  86, 237, 252, 207],
      //   shares: Uint8Array(5) [ 18, 2, 112, 55, 92 ]} ]
yay staked balance!


okay undelegate?
  https://github.com/oasisprotocol/sapphire-paratime/blob/d8246ee179e3f49e5a321a1a79dd340f6fdb571c/contracts/contracts/Subcall.sol#L429-L436
  says from, shares

  console.log('consensus.Undelegate', coder.encode(["string", "bytes"], ["consensus.Undelegate", cborg.encode({
    shares: [oasis.quantity.fromBigInt(2n * (10n**9n)), oasisRT.token.NATIVE_DENOMINATION],
    from: oasis.staking.addressFromBech32('oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c'), // Princess Stake on testnet
  })]))
  // 0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000014636f6e73656e7375732e556e64656c6567617465000000000000000000000000000000000000000000000000000000000000000000000000000000000000002aa26466726f6d55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf667368617265738244773594004000000000000000000000000000000000000000000000
  // https://docs.metamask.io/wallet/reference/eth_sendtransaction/?Transaction[to]=0x0100000000000000000000000000000000000103&Transaction[from]=0xC3ecf872F643C6238Aa20673798eed6F7dA199e9&Transaction[data]=0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000014636f6e73656e7375732e556e64656c6567617465000000000000000000000000000000000000000000000000000000000000000000000000000000000000002aa26466726f6d55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf667368617265738244773594004000000000000000000000000000000000000000000000
  made a transaction
  https://explorer.dev.oasis.io/testnet/sapphire/tx/0xc3a803c2c493ade5ccb45081e49112f3ae4480fd20246c8c937fd6672b68443e

  next block doesnt have the event?
  https://explorer.dev.oasis.io/testnet/sapphire/block/7877923/events#events
  next also not
  https://explorer.dev.oasis.io/testnet/sapphire/block/7877924/events#events

  probably failed


  https://github.com/oasisprotocol/cli/blob/5ee5605b0aaa61e5221f8646eee797a94e706179/cmd/account/undelegate.go#L71
  shares doesnt have denomination

  console.log('consensus.Undelegate 2', coder.encode(["string", "bytes"], ["consensus.Undelegate", cborg.encode({
    shares: oasis.quantity.fromBigInt(2n * (10n**9n)),
    from: oasis.staking.addressFromBech32('oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c'), // Princess Stake on testnet
  })]))
  // 0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000014636f6e73656e7375732e556e64656c65676174650000000000000000000000000000000000000000000000000000000000000000000000000000000000000028a26466726f6d55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf667368617265734477359400000000000000000000000000000000000000000000000000
  // https://docs.metamask.io/wallet/reference/eth_sendtransaction/?Transaction[to]=0x0100000000000000000000000000000000000103&Transaction[from]=0xC3ecf872F643C6238Aa20673798eed6F7dA199e9&Transaction[data]=0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000014636f6e73656e7375732e556e64656c65676174650000000000000000000000000000000000000000000000000000000000000000000000000000000000000028a26466726f6d55000c6e2ca6f55bc5f287f24b391fc7f00556edfccf667368617265734477359400000000000000000000000000000000000000000000000000
  https://explorer.dev.oasis.io/testnet/sapphire/block/7877968/events#events
  has event  Start to undelegate from consensus

  // https://github.com/lukaw3d/oasis-parse-grpc/blob/3de5c570338571504f27d50cc82ca2d6a22ac554/parseGrpc.js#L99
  out(await consensusWrapper.query('consensus.Undelegations').setArgs({to: daveAddr}).query(testnetNic))
  // [ { from: 'oasis1qqxxut9x74dutu587f9nj8787qz4dm0ueu05l88c', epoch: 38275, shares: '2.238386362' } ]

```
