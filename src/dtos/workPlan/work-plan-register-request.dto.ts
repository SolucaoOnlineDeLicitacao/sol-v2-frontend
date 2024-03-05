export abstract class WorkPlanRegisterRequest {
  name?: string;
  product?: Array<{ quantity?: number; unit?: string; unitValue?: number; items?: string }>;
}

export interface WorkPlanProductInterface {
  quantity?: number;
  unitValue?: number;
  items?: string;
  unit?: string;
}
