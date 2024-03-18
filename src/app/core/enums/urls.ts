const mainUrls = 'https://pwksm.ovh/qufu/';

export enum AuthUrls {
  REGISTER_URL_LOGIN = mainUrls + 'register.php',
  LOGIN_URL = mainUrls + 'login.php',
  UPDATE_PROFILE_URL = mainUrls + 'updateProfile.php',
  GET_PROFILE_URL = mainUrls + 'getProfile.php',
}

export enum DeleteUrls {
  DELETE_URL = mainUrls + 'delete.php',
}

export enum PostUrls {
  URL_TO_POST_COMMENT = mainUrls + 'postComment.php',
  URL_TO_POST_ARTICLE = mainUrls + 'postArticle.php',
}

export enum SearchUrls {
  IMAGE_URL = mainUrls + 'assets/images/',
  URL_JSON_DATA = mainUrls,
}
