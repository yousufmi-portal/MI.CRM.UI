export const BudgetCategoryMap: {
  [key: string]: { id: number; description: string | null };
} = {
  Personnel: { id: 1, description: null },
  'Fringe Benefits': { id: 2, description: null },
  Travel: { id: 3, description: null },
  Equipment: { id: 4, description: null },
  Supplies: { id: 5, description: null },
  Contractual: { id: 6, description: null },
  Construction: { id: 7, description: null },
  Other: { id: 8, description: null },
  'Indirect Charges': { id: 9, description: null }
};

export const BudgetCategoryList: {
  id: number;
  name: string;
  description: string | null;
}[] = [
    { id: 1, name: 'Personnel', description: null },
    { id: 2, name: 'Fringe Benefits', description: null },
    { id: 3, name: 'Travel', description: null },
    { id: 4, name: 'Equipment', description: null },
    { id: 5, name: 'Supplies', description: null },
    { id: 6, name: 'Contractual', description: null },
    { id: 7, name: 'Construction', description: null },
    { id: 8, name: 'Other', description: null },
    { id: 9, name: 'Indirect Charges', description: null },
  ];


export function getBudgetCategoryList(): { name: string; description: string | null }[] {
  return Object.entries(BudgetCategoryMap).map(([name, value]) => ({
    name,
    description: value.description
  }));
}