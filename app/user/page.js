"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfileClient() {
  const session = useSession();

  console.log(session);

  return (
    <div className="user-page">
      {/* <Image
         fill
         src={user.picture}
         alt={user.name}
        className="user-page__image"
       /> */}
      <h3>Email: {session.data.user.email}</h3>
      <h3>Recent searches</h3>
    </div>
  );
}
