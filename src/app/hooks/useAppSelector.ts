import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "../store/store";

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default useAppSelector;
