export type StockStat = {
    [key: string]: number; // contoh: { "2025-06-01": 120 }
};

// Tipe data return dari SupplierService.get()
export type Stats = {
    overStock: number;
    underStock: number;
    unBalanced: number;
    unProcessed: number;
    stockIn: {
        daily: StockStat;
        weekly: StockStat;
        monthly: StockStat;
    };
    stockOut: {
        daily: StockStat;
        weekly: StockStat;
        monthly: StockStat;
    };
};