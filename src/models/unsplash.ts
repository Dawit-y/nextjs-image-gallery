export interface UnsplashImage {
  description: string;
  user: {
    username: string;
  };
  urls: {
    raw: string;
  };
  width: number;
  height: number;
}

export interface UnsplashUser {
  username: string;
  first_name: string;
  last_name: string;
}

export interface UnsplashSearchResponse {
  results: UnsplashImage[];
}
