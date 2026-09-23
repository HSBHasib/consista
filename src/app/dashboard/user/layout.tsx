import { getAuthUserDataFromCookie } from "@/utils/userData.utils";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getAuthUserDataFromCookie();
  const userRole = user?.role;

  if (userRole !== "USER") {
    return "/unauthorized";
  }
  return children;
};

export default UserLayout;
