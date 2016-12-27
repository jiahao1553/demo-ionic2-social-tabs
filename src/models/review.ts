export interface Review {
  id: string;
  topic: string;
  ideaId: string;
  idea: string;
  area: string;
  updatedAt: string;
  suggestionId: string;
  suggestion: string;
  benefit: string;
  benefitCategory: string;
  ideaOwner: string;
  teamMembers: string;
  imageBefore: string;
  imageAfter: string;

  softSaving: number;
  hardSaving: number;

  ctTime: number;
  ctCost: number;
  ctFreq: number;
  ctFreqMultiplier: number;
  ctPeople: number;
  ctTotal: number;

  srwUnitReduction: number;
  srwCost: number;
  srwTotal: number;

  suSpaceReduction: number;
  suOverhead: number;
  suTotal: number;

  iaQuantity: number;
  iaCost: number;
  iaTotal: number;

  ooTotal: number;
  ooNotes: string;

  hsPeopleCost: number;
  hsOvertime: number;
  hsTempWorker: number;
  hsSrw: number;
  hsOther: number;
  hsNotes: string;
}
