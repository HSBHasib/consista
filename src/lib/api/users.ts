import { ApiResponse } from "@/types/ApiResponse";
import { protectedFetch } from "../core/server";
import { UserProfileData } from "@/types/user/User.type";

export const getUser = async (): Promise<ApiResponse<UserProfileData> | null> => {
    try {
        return await protectedFetch("users/profile");
    } catch {
        return null;
    }
}
