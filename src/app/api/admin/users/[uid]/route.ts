import { NextResponse } from 'next/server';
import {
  deleteUserPermanently,
  verifyAdminRequest,
} from '@/lib/firebase/admin-server';

type RouteContext = {
  params: Promise<{ uid: string }>;
};

export async function DELETE(req: Request, context: RouteContext) {
  try {
    const authResult = await verifyAdminRequest(req);

    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status },
      );
    }

    const { uid } = await context.params;

    if (!uid) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (uid === authResult.admin.uid) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 },
      );
    }

    await deleteUserPermanently(uid);

    return NextResponse.json(
      { message: 'User permanently deleted' },
      { status: 200 },
    );
  } catch (error) {
    console.error('[DELETE /api/admin/users/[uid]]', error);
    const message =
      error instanceof Error ? error.message : 'Failed to delete user';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
