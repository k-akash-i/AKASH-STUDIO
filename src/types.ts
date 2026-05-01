/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Masterpiece {
  id: string;
  title: string;
  description: string;
  technicalSpecs: string;
  imageUrl: string;
  previewUrl: string;
  secondaryImageUrl?: string; // For higher res zoom
  date: string;
  status: 'available' | 'exchanged';
  exchangeValue?: string; // What it was exchanged for
}

export interface BarterOffer {
  id: string;
  masterpieceId: string;
  offererName: string;
  offerDescription: string;
  email: string;
  status: 'pending' | 'accepted' | 'declined';
}
