import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { Tokens, getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { User } from "@/lib/AuthContext";
import { AuthProvider } from "@/lib/AuthProvider";
import { clientConfig, serverConfig } from "@/config";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Lab Informatika",
    default: "Lab Informatika",
  },
  description: "Official Site of Lab Informatika Universitas Udayana",
};

const toUser = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken;

  const customClaims = filterStandardClaims(decodedToken);

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <main>
          <AuthProvider user={user}>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
