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


export function getBudgetCategoryList(): { name: string; description: string | null }[] {
  return Object.entries(BudgetCategoryMap).map(([name, value]) => ({
    name,
    description: value.description
  }));
}