export const BudgetTypeMap: {
    [key: string]: { id: number; description: string | null };
} = {
    Approved: { id: 1, description: null },
    Disbursed: { id: 2, description: null },
    Remaining: { id: 3, description: null }
};
