import * as oasis from '@oasisprotocol/client'
import { formatUnits } from 'ethers'
import { sha512_256 } from 'js-sha512'

/**
 * oasis.address.fromData(...) but without being needlessly asynchronous
 *
 * @param {string} contextIdentifier
 * @param {number} contextVersion
 * @param {Uint8Array} data
 * @returns {Uint8Array}
 */
function oasisAddressFromDataSync(contextIdentifier, contextVersion, data) {
  const versionU8 = new Uint8Array([contextVersion])
  return oasis.misc.concat(
    versionU8,
    new Uint8Array(
      sha512_256.arrayBuffer(oasis.misc.concat(oasis.misc.fromString(contextIdentifier), versionU8, data)),
    ).slice(0, 20),
  )
}

export function parseGrpc(obj) {
  if (obj == null) return `${obj}`
  return JSON.parse(
    JSON.stringify(
      obj,
      (k, v) => {
        if (v instanceof Uint8Array) {
          return `${(() => {
            try {
              return { as_CBOR: oasis.misc.fromCBOR(v) }
            } catch (err) {}
            if (['rate', 'rate_min', 'rate_max'].includes(k)) return `${formatUnits(oasis.quantity.toBigInt(v), 3)}%`
            if (v.length === 21) return annotateKnown(oasis.staking.addressToBech32(v))
            if (v.length === 32)
              return `${annotateKnown(
                oasis.staking.addressToBech32(oasisAddressFromDataSync('oasis-core/address: staking', 0, v)),
              )} or ${annotateKnown(oasis.misc.toHex(v))}`
            if (v.length > 32) return annotateKnown(oasis.misc.toHex(v))
            if (v.length === 0) return '[]'
            if (k.includes('shares')) return `${formatUnits(oasis.quantity.toBigInt(v), 9)} gigashares`
            return formatUnits(oasis.quantity.toBigInt(v), 9)
          })()} or Uint8Array([${v.toString()}])`
        }
        if (typeof v === 'bigint') return v.toString()
        if (v instanceof Map) return { as_Map: [...v.entries()] }
        return v
      },
      2,
    ),
  )
}

function parseCborFromBase64(base64data) {
  try {
    return [oasis.misc.fromCBOR(oasis.misc.fromBase64(base64data))]
  } catch (e) {}

  // Split multiple base64s; hopefully gAAAA is a good delimiter. `/(?=...)/g` keeps the delimiter after splitting.
  const [cborPart, ...otherParts] = base64data.split(/(?=gAAAA)/g)

  return [oasis.misc.fromCBOR(oasis.misc.fromBase64(cborPart).slice(5)), ...otherParts.map(atob)]
}

function annotateKnown(str) {
  const knownStrings = {
    oasis1qrmufhkkyyf79s5za2r8yga9gnk4t446dcy3a5zm: 'Consensus Common Pool',
    oasis1qqnv3peudzvekhulf8v3ht29z4cthkhy7gkxmph5: 'Consensus Fee Accumulator',
    oasis1qp65laz8zsa9a305wxeslpnkh9x4dv2h2qhjz0ec: 'Governance Escrow',
    oasis1qzq8u7xs328puu2jy524w3fygzs63rv3u5967970: 'Burn Address',
    oasis1qrd3mnzhhgst26hsp96uf45yhq6zlax0cuzdgcfc: 'Sapphire	Mainnet',
    oasis1qqczuf3x6glkgjuf0xgtcpjjw95r3crf7y2323xd: 'Sapphire Testnet',
    oasis1qzvlg0grjxwgjj58tx2xvmv26era6t2csqn22pte: 'Emerald	Mainnet',
    oasis1qr629x0tg9gm5fyhedgs9lw5eh3d8ycdnsxf0run: 'Emerald Testnet',
    oasis1qrnu9yhwzap7rqh6tdcdcpz0zf86hwhycchkhvt8: 'Cipher Mainnet',
    oasis1qqdn25n5a2jtet2s5amc7gmchsqqgs4j0qcg5k0t: 'Cipher Testnet',
    oasis1qrg6c89655pmdxeel08qkngs02jnrfll5v9c508v: 'Pontus-X Testnet',
    oasis1qr02702pr8ecjuff2z3es254pw9xl6z2yg9qcc6c: 'Pontus-X Devnet',

    oasis1qz78phkdan64g040cvqvqpwkplfqf6tj6uwcsh30: 'ParaTime Common Pool',
    oasis1qp3r8hgsnphajmfzfuaa8fhjag7e0yt35cjxq0u4: 'ParaTime Fee Accumulator',
    oasis1qp7x0q9qahahhjas0xde8w0v04ctp4pqzu5mhjav: 'Rewards Account',
    oasis1qr677rv0dcnh7ys4yanlynysvnjtk9gnsyhvm6ln: 'Pending Withdrawal Account',
    oasis1qzcdegtf7aunxr5n5pw7n5xs3u7cmzlz9gwmq49r: 'Pending Delegation Account',
    oasis1qq2v39p9fqk997vk6742axrzqyu9v2ncyuqt8uek: 'Zero Address',

    '000000000000000000000000000000000000000000000000e2eaa99fc008f87f': 'Emerald Mainnet',
    '00000000000000000000000000000000000000000000000072c8215e60d5bca7': 'Emerald Testnet',
    '000000000000000000000000000000000000000000000000e199119c992377cb': 'Cipher Mainnet',
    '0000000000000000000000000000000000000000000000000000000000000000': 'maybe Cipher Testnet',
    '000000000000000000000000000000000000000000000000f80306c9858e7279': 'Sapphire Mainnet',
    '000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c': 'Sapphire Testnet',
    '00000000000000000000000000000000000000000000000004a6f9071c007069': 'Pontus-X Testnet',
    '0000000000000000000000000000000000000000000000004febe52eb412b421': 'Pontus-X Devnet',
  }
  if (str === 'oasis1xtnxq8') return '?forgot to await oasis.address.fromData?'

  return str + (knownStrings[str] ? ` ${knownStrings[str]}` : '')
}
