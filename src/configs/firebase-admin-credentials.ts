import { ServiceAccount } from 'firebase-admin/lib/app/credential';
import { config } from 'dotenv';
config();

/**
 * Encoded private key of Firebase Service Account
 */
let encodedPrivateKey : string | undefined = process.env.FIREBASE_PRIVATE_KEY;

if ( encodedPrivateKey !== undefined ) encodedPrivateKey = atob( encodedPrivateKey );
else throw new Error( 'FIREBASE_PRIVATE_KEY is undefined' );

/**
 * Firebase Service Account credentials
 */

export const adminCredentials : ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,

  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,

  privateKey: encodedPrivateKey,
};
