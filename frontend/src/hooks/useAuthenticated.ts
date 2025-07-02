
import type { RootState } from "@/redux/store/store"
import { useSelector } from "react-redux"

export const useAuthenticated = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    return isAuthenticated;
}
