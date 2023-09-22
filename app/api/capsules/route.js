import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const serial = searchParams.get('serial');
    const type = searchParams.get('type');
    const page = searchParams.get('page');

    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (type) {
      filter.type = type;
    }
    if (serial) {
      filter.serial = serial;
    }

    const apiUrl = new URL('https://api.spacexdata.com/v4/capsules/query');
    const query = {
      query: filter,
      options: {
        page,
        limit: 20,
      },
    };
    const response = await fetch(apiUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });
    const capsules = await response.json();
    return NextResponse.json({ capsules });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
