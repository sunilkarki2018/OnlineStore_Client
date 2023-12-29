import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import useAppSelector from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";

interface Props {
  onProductSizeSearch: (value: string) => void;
}

export default function ProductSizeSearch({ onProductSizeSearch }: Props) {
  const [age, setAge] = React.useState("");
  const { productSizes } = useAppSelector((state: AppState) => state.productSize);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    onProductSizeSearch(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 265 }}>
        <InputLabel id="demo-simple-select-helper-label">Search by ProductSize</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="ProductSize"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {productSizes.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
