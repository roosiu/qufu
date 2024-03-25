const mainUrls = 'https://piotrrosiak.pl/qufu/';
const backendUrls = 'https://piotrrosiak.pl/qufu/backend/';
export enum AuthUrls {
  REGISTER_URL_LOGIN = backendUrls + 'register.php',
  LOGIN_URL = backendUrls + 'login.php',
  UPDATE_PROFILE_URL = backendUrls + 'updateProfile.php',
  GET_PROFILE_URL = backendUrls + 'getProfile.php',
}

export enum DeleteUrls {
  DELETE_URL = backendUrls + 'delete.php',
}

export enum PostUrls {
  URL_TO_POST_COMMENT = backendUrls + 'postComment.php',
  URL_TO_POST_ARTICLE = backendUrls + 'postArticle.php',
}

export enum SearchUrls {
  IMAGE_URL = mainUrls + 'assets/images/',
  URL_JSON_DATA = backendUrls,
}

export enum GetFilesUrls {
  MAIN_FILES_URL = mainUrls + 'assets/',
  GET_FILES_URL = backendUrls + 'getFiles.php',
}
