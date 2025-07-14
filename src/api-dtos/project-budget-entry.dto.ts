export interface ProjectBudgetEntryDto {
  id: number;
  projectId: number;
  awardNumber: string;
  categoryId: number;
  typeId: number;
  amount: number;
  notes?: string;
  categoryName?: string;
  typeName?: string;
}
