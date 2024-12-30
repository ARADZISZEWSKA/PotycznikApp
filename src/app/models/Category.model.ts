export interface Category {
    id: number;            // ID kategorii
    name: string;          // Nazwa kategorii
    parentCategoryId?: number;  // ID rodzica (opcjonalnie, dla podkategorii)
  }