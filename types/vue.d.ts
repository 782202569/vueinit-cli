import { Payload, DispatchOptions, CommitOptions, StoreOptions, Store } from 'vuex'

import { store as baseStore } from '../src/store/index'

export type platformStoreConfig = typeof baseStore

export type platformAction = keyof platformStoreConfig['actions']
export type platformState = platformStoreConfig['state']
export type platformMutation = keyof platformStoreConfig['mutations']

export interface Dispatch {
  (type: platformAction, payload?: any, options?: DispatchOptions): Promise<any>
  <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>
}
export interface Commit {
  (type: platformMutation, payload?: any, options?: CommitOptions): void
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void
}

export type platformStore = Store<platformState> & {
  dispatch: Dispatch
  commit: Commit
}
