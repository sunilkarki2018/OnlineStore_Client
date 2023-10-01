import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useAppSelector from "../../app/hooks/useAppSelector";
import { AppState } from "../../app/store/store";

interface Props {
  onCategorySearch: (value: number) => void;
}

export default function CategorySearch({ onCategorySearch }: Props) {
  const [age, setAge] = React.useState("");
  const { categories } = useAppSelector((state: AppState) => state.category);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    onCategorySearch(+event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 265 }}>
        <InputLabel id="demo-simple-select-helper-label">Search by Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
