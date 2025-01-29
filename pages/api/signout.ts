import { NextApiRequest, NextApiResponse } from 'next';
import { signOut } from '@/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await signOut();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to sign out' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}