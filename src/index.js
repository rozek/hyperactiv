import { observe, modifiedProperty } from './observe.js'
import { computed } from './computed.js'
import { dispose } from './dispose.js'
import { process } from './batcher.js'

export default {
  observe, modifiedProperty,
  computed,
  dispose,
  batch: process
}
