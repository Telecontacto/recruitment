import { auth } from '@/auth'

export default async function Session() {
    return await auth();
}