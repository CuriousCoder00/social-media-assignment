import { ProfileDetails } from "@/components/account/user-profile";
import ConnectionPaths from "../connection-paths";

export default function Account() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ProfileDetails />
      <ConnectionPaths />
    </div>
  );
}
