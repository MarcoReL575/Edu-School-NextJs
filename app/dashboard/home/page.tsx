import { usersService } from "@/src/features/clases/services/UsersService";
import { requireAuth } from "@/src/lib/auth-server"
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Edu-School: Inicio'
};


export default async function HomePage() {

  return (
    <div>HomePage</div>
  )
}
