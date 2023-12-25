import { TextField } from "@mui/material";
import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";

interface Props {
  onSearch: (value: string) => void;
}

export default function ProductSearch({ onSearch }: Props) {
  const [searchValue, setInputValue] = useState("");

  const searchProducts = () => {
    onSearch(searchValue);
  };
  useDebounce(searchProducts, searchValue);

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
