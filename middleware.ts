// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if sessionCartId cookie exists

  if (!request.cookies.get("sessionCartId")) {
    //  Generate new session cart cookie
    const sessionCartId = crypto.randomUUID();

    //  Clone the req header
    const newRequestHeaders = new Headers(request.headers);

    //  Create new response and add the new headers
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });
    // Set newly generated sessionCartId in response cookies
    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  }
}
