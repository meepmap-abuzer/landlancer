export type DecimalString = string

export interface CustomerProfile {
  customerId: string
  displayName: string
  phoneMasked: string
  membershipId: string
}

export interface PointsBalance {
  available: DecimalString
  pending: DecimalString
  held: DecimalString
}

export interface WalletLinks {
  appleUrl: string | null
  googleUrl: string | null
}

export interface LoyaltyCardData {
  id: string
  serialNumber: string
  cardTypeId?: string | null
  cardTypeName?: string | null
  qrValue: string
  alternateText: string
  wallets: WalletLinks
}

export interface StackRules {
  rulesVersion: number
  baseSizeMilli: number
  minOverlapMilli: number
  perfectToleranceMilli: number
  movementRangeMilli: number
  initialSpeedMilliPerSecond: number
  speedStepMilliPerSecond: number
  maxSpeedMilliPerSecond: number
  minEventIntervalMs: number
  maxEventIntervalMs: number
  runTtlSeconds: number
  maxEvents: number
}

export interface StackEvent {
  ordinal: number
  elapsedMs: number
  axis: 'X' | 'Z'
  position: string
}
