import { NextResponse } from 'next/server';

export async function GET(request) {
  // Input validation and sanitization
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 12;
  const status = searchParams.get('status') || '';
  const serial = searchParams.get('serial') || '';
  const type = searchParams.get('type') || '';

  // Construct the filter object
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

  // Construct the API request
  const apiUrl = new URL('https://api.spacexdata.com/v4/capsules/query');
  const query = {
    query: filter,
    options: {
      page,
      limit,
    },
  };

  // Send the API request
  const response = await fetch(apiUrl.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    // Handle non-OK responses with appropriate status codes and messages
    return NextResponse.error(
      `API request failed with status: ${response.status}`
    );
  }

  const capsules = await response.json();
  return NextResponse.json({ capsules });
}
