export type Cell = {
  id: number;
  amount: number;
  isDisabled: boolean;
  type?: string;
};

export type TTableSize = {
  rows: number | "";
  columns: number | "";
};
