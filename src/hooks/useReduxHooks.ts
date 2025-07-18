import type { AppDispatch, RootState } from "@/store";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

// ✅ Typed versions
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
