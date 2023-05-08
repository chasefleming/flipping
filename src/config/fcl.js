import { config } from '@onflow/fcl'
import { ACCESS_NODE_URLS } from '../constants'

const flowNetwork = process.env.REACT_APP_FLOW_NETWORK

console.log('Running on network:', flowNetwork)

config({
  'flow.network': flowNetwork,
  'accessNode.api': ACCESS_NODE_URLS[flowNetwork],
  'discovery.wallet': `https://fcl-discovery.onflow.org/${flowNetwork}/authn`,
  'app.detail.icon': 'https://avatars.githubusercontent.com/u/62387156?v=4',
  'app.detail.title': 'Flipping'
})