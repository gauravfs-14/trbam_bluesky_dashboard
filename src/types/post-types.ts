export interface Post {
  id: string;
  author: string;
  text: string;
  created_at: string;
  indexed_at: string;
  like_count: number;
  reply_count: number;
  repost_count: number;
  quote_count: number;
  raw_data: RawData;
}

export interface RawData {
  uri: string;
  cid: string;
  author: RawAuthor;
  record: RecordType;
  embed: EmbedView;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  quoteCount: number;
  indexedAt: string;
  viewer: Viewer;
  labels:
    | {
        src: string;
        uri: string;
        cid: string;
        val: string;
        cts: string;
      }
    | [];
}

export interface RawAuthor {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated?: {
    chat: {
      allowIncoming: string;
    };
  };
  viewer: {
    muted: boolean;
    blockedBy: boolean;
  };
  labels:
    | {
        src: string;
        uri: string;
        cid: string;
        val: string;
        cts: string;
      }
    | [];
  createdAt: string;
}

export interface RecordType {
  $type: string; // e.g., "app.bsky.feed.post"
  createdAt: string;
  embed: EmbedImages;
  facets: Facet[];
  langs: string[];
  text: string;
}

export interface EmbedImages {
  $type: string; // e.g., "app.bsky.embed.images"
  images: Image[];
}

export interface Image {
  alt: string;
  aspectRatio: {
    height: number;
    width: number;
  };
  image: {
    $type: string;
    ref: {
      $link: string;
    };
    mimeType: string;
    size: number;
  };
}

export interface Facet {
  features: FacetFeature[];
  index: {
    byteEnd: number;
    byteStart: number;
  };
}

export interface FacetFeature {
  $type: string; // can be "app.bsky.richtext.facet#link" or "app.bsky.richtext.facet#tag"
  uri?: string;
  tag?: string;
}

export interface EmbedView {
  $type: string; // e.g., "app.bsky.embed.images#view"
  images: EmbedViewImage[];
}

export interface EmbedViewImage {
  thumb: string;
  fullsize: string;
  alt: string;
  aspectRatio: {
    height: number;
    width: number;
  };
}

export interface Viewer {
  threadMuted: boolean;
  embeddingDisabled: boolean;
}
