export interface RoulettePrize { id:string; title:string; points_value:number; image_url?:string|null; }

export interface RouletteStripCell extends RoulettePrize {
  cellKey: string;
  isAnchor: boolean;
  isTarget: boolean;
  loopIndex: number;
}

export interface RouletteStripPlan {
  anchorCellKey: string | null;
  anchorPrizeId: string | null;
  cells: RouletteStripCell[];
  targetCellKey: string | null;
  targetPrizeId: string | null;
}

interface PrizeWithPoolIndex {
  poolIndex: number;
  prize: RoulettePrize;
}

interface BuildRouletteStripOptions {
  anchorLoopIndex?: number;
  anchorPrizeId?: string | null;
  loopCount?: number;
  shuffleCombo?: (combo: PrizeWithPoolIndex[], loopIndex: number) => PrizeWithPoolIndex[];
  targetLoopIndex?: number;
  targetPrize: RoulettePrize;
  visiblePrizes: RoulettePrize[];
}

const DEFAULT_SPIN_LOOP_COUNT = 6;
const DEFAULT_IDLE_LOOP_COUNT = 3;
const DEFAULT_SPIN_ANCHOR_LOOP_INDEX = 1;
const DEFAULT_SPIN_TARGET_LOOP_INDEX = 4;

export function buildRouletteSpinStrip(options: BuildRouletteStripOptions): RouletteStripPlan {
  const loopCount = Math.max(2, options.loopCount ?? DEFAULT_SPIN_LOOP_COUNT);
  const anchorLoopIndex = clampLoopIndex(
    options.anchorLoopIndex ?? DEFAULT_SPIN_ANCHOR_LOOP_INDEX,
    loopCount,
  );
  const targetLoopIndex = clampLoopIndex(
    options.targetLoopIndex ?? DEFAULT_SPIN_TARGET_LOOP_INDEX,
    loopCount,
  );
  const resolvedTargetLoopIndex =
    targetLoopIndex <= anchorLoopIndex && anchorLoopIndex < loopCount - 1
      ? anchorLoopIndex + 1
      : targetLoopIndex;

  return buildRouletteStrip({
    ...options,
    anchorLoopIndex,
    anchorPrizeId: options.anchorPrizeId ?? null,
    loopCount,
    shuffleCombo: options.shuffleCombo ?? rotateComboByLoop,
    targetLoopIndex: resolvedTargetLoopIndex,
  });
}

export function buildRouletteIdleStrip(
  visiblePrizes: RoulettePrize[],
  anchorPrizeId?: string | null,
): RouletteStripPlan {
  const targetPrize = findAnchorPrize(visiblePrizes, anchorPrizeId);
  if (targetPrize === null) {
    return emptyPlan();
  }

  const anchorLoopIndex = Math.floor(DEFAULT_IDLE_LOOP_COUNT / 2);
  return buildRouletteStrip({
    anchorLoopIndex,
    anchorPrizeId: targetPrize.id,
    loopCount: DEFAULT_IDLE_LOOP_COUNT,
    shuffleCombo: rotateComboByLoop,
    targetLoopIndex: anchorLoopIndex,
    targetPrize,
    visiblePrizes,
  });
}

export function calculateCenteredTranslate(params: {
  cellLeft: number;
  cellWidth: number;
  containerWidth: number;
}): number {
  return params.containerWidth / 2 - (params.cellLeft + params.cellWidth / 2);
}

export function easeOutCubic(progress: number): number {
  const clamped = Math.min(Math.max(progress, 0), 1);
  return 1 - Math.pow(1 - clamped, 3);
}

function buildRouletteStrip(options: Required<BuildRouletteStripOptions>): RouletteStripPlan {
  const prizePool = ensurePrizeInPool(options.visiblePrizes, options.targetPrize);
  if (prizePool.length === 0) {
    return emptyPlan();
  }

  const anchorPrize = findAnchorPrize(prizePool, options.anchorPrizeId);
  const anchorPrizeId = anchorPrize?.id ?? prizePool[0].id;
  const targetPrizeId = options.targetPrize.id;
  const cells: RouletteStripCell[] = [];
  let anchorCellKey: string | null = null;
  let targetCellKey: string | null = null;

  for (let loopIndex = 0; loopIndex < options.loopCount; loopIndex += 1) {
    const baseCombo = prizePool.map((prize, poolIndex) => ({ poolIndex, prize }));
    const combo =
      loopIndex === options.anchorLoopIndex || loopIndex === options.targetLoopIndex
        ? baseCombo
        : options.shuffleCombo(baseCombo, loopIndex);

    for (const [displayIndex, item] of combo.entries()) {
      const cellKey = `${loopIndex}:${displayIndex}:${item.prize.id}`;
      const isAnchor = loopIndex === options.anchorLoopIndex && item.prize.id === anchorPrizeId;
      const isTarget = loopIndex === options.targetLoopIndex && item.prize.id === targetPrizeId;

      if (isAnchor) {
        anchorCellKey = cellKey;
      }
      if (isTarget) {
        targetCellKey = cellKey;
      }

      cells.push({
        ...item.prize,
        cellKey,
        isAnchor,
        isTarget,
        loopIndex,
      });
    }
  }

  return {
    anchorCellKey,
    anchorPrizeId,
    cells,
    targetCellKey,
    targetPrizeId,
  };
}

function ensurePrizeInPool(
  visiblePrizes: RoulettePrize[],
  targetPrize: RoulettePrize,
): RoulettePrize[] {
  if (visiblePrizes.some((prize) => prize.id === targetPrize.id)) {
    return [...visiblePrizes];
  }

  return [...visiblePrizes, targetPrize];
}

function findAnchorPrize(
  visiblePrizes: RoulettePrize[],
  anchorPrizeId?: string | null,
): RoulettePrize | null {
  if (visiblePrizes.length === 0) {
    return null;
  }

  return visiblePrizes.find((prize) => prize.id === anchorPrizeId) ?? visiblePrizes[0];
}

function clampLoopIndex(loopIndex: number, loopCount: number): number {
  return Math.min(Math.max(Math.trunc(loopIndex), 0), loopCount - 1);
}

function rotateComboByLoop(
  combo: PrizeWithPoolIndex[],
  loopIndex: number,
): PrizeWithPoolIndex[] {
  if (combo.length <= 1) {
    return combo;
  }

  const shift = loopIndex % combo.length;
  return [...combo.slice(shift), ...combo.slice(0, shift)];
}

function emptyPlan(): RouletteStripPlan {
  return {
    anchorCellKey: null,
    anchorPrizeId: null,
    cells: [],
    targetCellKey: null,
    targetPrizeId: null,
  };
}
