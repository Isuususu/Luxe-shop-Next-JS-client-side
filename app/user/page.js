import Image from "next/image";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Wishlist from "../../components/Wishlist/Wishlist";

export default async function ProfileClient() {
  const session = await getServerSession(options);

  console.log(session);

  return (
    <div className="user-page">
      <Image
        className="user-modal__header__avatar-img"
        src="/images/user-avatar.png"
        alt=""
        width={60}
        height={60}
      />

      <Wishlist />
      <h3>Email: {session.user.email}</h3>
      <h3>Recent searches</h3>
    </div>
  );
}
