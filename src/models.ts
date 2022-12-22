/** Api Detail Models */
type AuthenticationSettings = {
  oauth: string
  openid: string
}

type SubscriptionKeyParameterNames = {
  header: string
  query: string
}

export type ApiProperties = {
  displayName: string
  apiRevision: string
  description: string
  subscriptionRequired: boolean
  serviceUrl: string
  path: string
  protocols: Array<string>
  authenticationSettings: AuthenticationSettings
  subscriptionKeyParameterNames: SubscriptionKeyParameterNames
  isCurrent: boolean
}

export type ApiDetail = BaseModel & {
  properties: ApiProperties
}

/**Hostname Models */
type ApimHostNameProperties = {
  value: string
}

export type ApimHostName = BaseModel & {
  properties: ApimHostNameProperties
}

/**Operation Models */
type OperationProperties = {
  displayName: string
  method: string
  urlTemplate: string
  templateParameters: Array<string>
  description: string
  responses: Array<string>
  policies: Array<string>
}

export type Operation = BaseModel & {
  properties: OperationProperties
}

/** Subscription Models */
type SubscriptionProperties = {
  ownerId: string
  scope: string
  displayName: string
  state: string
  createDate: Date
  startDate: Date
  expirationDate: Date
  endDate: Date
  notificationDate: Date
  stateComment: string
}

export type Subscription  = BaseModel & {  
  properties: SubscriptionProperties
}

/**Subscription Secret Models */
export type SubscriptionSecrets = {
  primaryKey: string
  secondaryKey: string
}

/**Product Models */
type ProductProperties = {
  displayName: string
  description: string
  terms: string
  subscriptionRequired: boolean
  approvalRequired: string
  subscriptionsLimit: number
  state: string
}

export type Product = BaseModel & {
  properties: ProductProperties
}

/**Generic Types */
type BaseModel = {
  id: string
  type: string
  name: string
}

export type ArrayResponse<T> = {
  value: Array<T>
}

/**Default Values */
const baseModelDefault: BaseModel = {
  id: '',
  type: '',
  name: ''
}

export const apiDetailDefault: ApiDetail = {
  ...baseModelDefault,
  properties:{
    displayName: '',
    apiRevision: '',
    description: '',
    subscriptionRequired: false,
    serviceUrl: '',
    path: '',
    protocols: [],
    authenticationSettings: {
      oauth: '',
      openid: ''
    },
    subscriptionKeyParameterNames: {
      header: '',
      query: ''
    },
    isCurrent: false
  }
}

export const subscriptionSecretsDefault: SubscriptionSecrets = {
  primaryKey: '',
  secondaryKey: ''
}