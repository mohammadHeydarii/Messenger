//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import type { AxiosRequestConfig } from 'axios';
import type { SwaggerResponse } from './config';
import { Http } from './httpRequest';
//@ts-ignore
import qs from 'qs';
import type {
  GetAuthorityFindRolesQueryParams,
  GetAuthorityAccessListQueryParams,
  GetAuthorityAuthorityListQueryParams,
  GetAuthorityGetRoleByIdQueryParams,
  GetAuthorityGetAccessByIdQueryParams,
  GetAuthorityGetMandatoryListQueryParams,
  DeleteAuthorityDeleteMandatoryQueryParams,
  GetAdminUsersListQueryParams,
  GetAdminGetAllChannelsListQueryParams,
  GetAdminGetAllGroupsListQueryParams,
  DeleteAdminDeleteUserQueryParams,
  GetAdminGetUserProfileByAdminQueryParams,
  GetUserFindUserQueryParams,
  GetChatFindConversationsQueryParams,
  DeleteChatDeleteFileQueryParams,
  GetChatConversationMessagesQueryParams,
  GetChatSearchMessageInConversationQueryParams,
  GetChatGetAllMessagesQueryParams,
  GetChatGoToReplyMessageQueryParams,
  LoginUserNameDto,
  LoginPasswordDto,
  LoginUserDto,
  ForgetPasswordDto,
  AddNewRoleDto,
  AddNewAccessDto,
  UpdateAccessDto,
  UpdateRoleDto,
  UpdateMandatoryDto,
  AddNewMandatoryDto,
  AddNewUserDto,
  AddNewChannelDto,
  UpdateUserProfileByAdminDto,
  UpdateChannelAdnGroupDto,
  UpdateUserStatusDto,
  UpdateUserPasswordDto,
  UpdateUserProfileDto,
  AddNewConversationDto,
  AddNewGroupDto,
  SendMessageDto,
  DeleteMessageDto,
  EditMessageDto,
  ForwardMessageDto,
  DeleteConversationsDto,
  PinMessageDto,
  LeaveChannelGroupDto,
  UpdateGroupDto,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __DEV__ = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function overrideConfig(
  config?: AxiosRequestConfig,
  configOverride?: AxiosRequestConfig,
): AxiosRequestConfig {
  return {
    ...config,
    ...configOverride,
    headers: {
      ...config?.headers,
      ...configOverride?.headers,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function template(path: string, obj: { [x: string]: any } = {}) {
  Object.keys(obj).forEach((key) => {
    const re = new RegExp(`{${key}}`, 'i');
    path = path.replace(re, obj[key]);
  });

  return path;
}

function isFormData(obj: any) {
  // This checks for the append method which should exist on FormData instances
  return (
    (typeof obj === 'object' &&
      typeof obj.append === 'function' &&
      obj[Symbol.toStringTag] === undefined) ||
    obj[Symbol.toStringTag] === 'FormData'
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToForm(requestBody: object) {
  if (isFormData(requestBody)) {
    return requestBody;
  }
  const formData = new FormData();

  Object.entries(requestBody).forEach(([key, value]) => {
    value && formData.append(key, value);
  });

  return formData;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToUrlencoded(requestBody: object) {
  return qs.stringify(requestBody);
}

export const deleteAdminDeleteUser = (
  queryParams: DeleteAdminDeleteUserQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.deleteRequest(
    deleteAdminDeleteUser.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteAdminDeleteUser.key = '/admin/deleteUser';

export const deleteAuthorityDeleteMandatory = (
  queryParams: DeleteAuthorityDeleteMandatoryQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.deleteRequest(
    deleteAuthorityDeleteMandatory.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteAuthorityDeleteMandatory.key = '/authority/deleteMandatory';

export const deleteChatDeleteConversation = (
  requestBody: DeleteConversationsDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.deleteRequest(
    deleteChatDeleteConversation.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteChatDeleteConversation.key = '/chat/deleteConversation';

export const deleteChatDeleteFile = (
  queryParams: DeleteChatDeleteFileQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.deleteRequest(
    deleteChatDeleteFile.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteChatDeleteFile.key = '/chat/deleteFile';

export const deleteChatDeleteMessage = (
  requestBody: DeleteMessageDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.deleteRequest(
    deleteChatDeleteMessage.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteChatDeleteMessage.key = '/chat/deleteMessage';

export const getAdminGetAllChannelsList = (
  queryParams: GetAdminGetAllChannelsListQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAdminGetAllChannelsList.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAdminGetAllChannelsList.key = '/admin/getAllChannelsList';

export const getAdminGetAllGroupsList = (
  queryParams: GetAdminGetAllGroupsListQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAdminGetAllGroupsList.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAdminGetAllGroupsList.key = '/admin/getAllGroupsList';

export const getAdminGetUserProfileByAdmin = (
  queryParams?: GetAdminGetUserProfileByAdminQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAdminGetUserProfileByAdmin.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAdminGetUserProfileByAdmin.key = '/admin/getUserProfileByAdmin';

/**
 *
 * list of all users.
 */
export const getAdminUsersList = (
  queryParams: GetAdminUsersListQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAdminUsersList.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAdminUsersList.key = '/admin/usersList';

export const getAuthorityAccessList = (
  queryParams: GetAuthorityAccessListQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAuthorityAccessList.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAuthorityAccessList.key = '/authority/accessList';

export const getAuthorityAuthorityList = (
  queryParams: GetAuthorityAuthorityListQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAuthorityAuthorityList.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAuthorityAuthorityList.key = '/authority/authorityList';

export const getAuthorityFindPermissions = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAuthorityFindPermissions.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAuthorityFindPermissions.key = '/authority/findPermissions';

export const getAuthorityFindRoles = (
  queryParams: GetAuthorityFindRolesQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAuthorityFindRoles.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAuthorityFindRoles.key = '/authority/findRoles';

export const getAuthorityGetAccessById = (
  queryParams: GetAuthorityGetAccessByIdQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAuthorityGetAccessById.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAuthorityGetAccessById.key = '/authority/getAccessById';

export const getAuthorityGetMandatoryList = (
  queryParams: GetAuthorityGetMandatoryListQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAuthorityGetMandatoryList.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAuthorityGetMandatoryList.key = '/authority/getMandatoryList';

export const getAuthorityGetRoleById = (
  queryParams: GetAuthorityGetRoleByIdQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getAuthorityGetRoleById.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAuthorityGetRoleById.key = '/authority/getRoleById';

export const getChatConversationMessages = (
  queryParams: GetChatConversationMessagesQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getChatConversationMessages.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getChatConversationMessages.key = '/chat/conversationMessages';

export const getChatFindConversations = (
  queryParams: GetChatFindConversationsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getChatFindConversations.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getChatFindConversations.key = '/chat/findConversations';

export const getChatGetAllMessages = (
  queryParams: GetChatGetAllMessagesQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getChatGetAllMessages.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getChatGetAllMessages.key = '/chat/getAllMessages';

export const getChatGoToReplyMessage = (
  queryParams: GetChatGoToReplyMessageQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getChatGoToReplyMessage.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getChatGoToReplyMessage.key = '/chat/goToReplyMessage';

export const getChatSearchMessageInConversation = (
  queryParams: GetChatSearchMessageInConversationQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getChatSearchMessageInConversation.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getChatSearchMessageInConversation.key = '/chat/searchMessageInConversation';

export const getLoginAccessToken = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getLoginAccessToken.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getLoginAccessToken.key = '/login/accessToken';

export const getLoginLogout = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getLoginLogout.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getLoginLogout.key = '/login/logout';

export const getUserFindUser = (
  queryParams: GetUserFindUserQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getUserFindUser.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUserFindUser.key = '/user/findUser';

/**
 *
 * Get user avatar .
 */
export const getUserGetUserAvatar = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getUserGetUserAvatar.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUserGetUserAvatar.key = '/user/getUserAvatar';

/**
 *
 * Get user profile information .
 */
export const getUserGetUserProfile = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getUserGetUserProfile.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUserGetUserProfile.key = '/user/getUserProfile';

export const patchUserUpdateAvatar = (
  requestBody: {
    /**
     *
     * - Format: binary
     */
    file?: string;
  },
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.patchRequest(
    patchUserUpdateAvatar.key,
    undefined,
    objToForm(requestBody),
    _CONSTANT1,
    overrideConfig(_CONSTANT2, configOverride),
  );
};

/** Key is end point string without base url */
patchUserUpdateAvatar.key = '/user/updateAvatar';

/**
 *
 * change user password.
 */
export const patchUserUpdateUserPassword = (
  requestBody: UpdateUserPasswordDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.patchRequest(
    patchUserUpdateUserPassword.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
patchUserUpdateUserPassword.key = '/user/updateUserPassword';

/**
 *
 * update user status (online,offline,..).
 */
export const patchUserUpdateUserStatus = (
  requestBody: UpdateUserStatusDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.patchRequest(
    patchUserUpdateUserStatus.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
patchUserUpdateUserStatus.key = '/user/updateUserStatus';

export const postAdminAddNewChannel = (
  requestBody: AddNewChannelDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postAdminAddNewChannel.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAdminAddNewChannel.key = '/admin/addNewChannel';

/**
 *
 * create new user by admin or operator.
 */
export const postAdminAddNewUser = (
  requestBody: AddNewUserDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postAdminAddNewUser.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAdminAddNewUser.key = '/admin/addNewUser';

export const postAuthorityAddMandatory = (
  requestBody: AddNewMandatoryDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postAuthorityAddMandatory.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAuthorityAddMandatory.key = '/authority/addMandatory';

export const postAuthorityAddNewAccess = (
  requestBody: AddNewAccessDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postAuthorityAddNewAccess.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAuthorityAddNewAccess.key = '/authority/addNewAccess';

export const postAuthorityAddNewRole = (
  requestBody: AddNewRoleDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postAuthorityAddNewRole.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAuthorityAddNewRole.key = '/authority/addNewRole';

export const postChatAddNewConversation = (
  requestBody: AddNewConversationDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postChatAddNewConversation.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postChatAddNewConversation.key = '/chat/addNewConversation';

export const postChatAddNewGroup = (
  requestBody: AddNewGroupDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postChatAddNewGroup.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postChatAddNewGroup.key = '/chat/addNewGroup';

export const postChatEditMessage = (
  requestBody: EditMessageDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postChatEditMessage.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postChatEditMessage.key = '/chat/editMessage';

export const postChatForwardMessage = (
  requestBody: ForwardMessageDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postChatForwardMessage.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postChatForwardMessage.key = '/chat/forwardMessage';

export const postChatPinMessage = (
  requestBody: PinMessageDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postChatPinMessage.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postChatPinMessage.key = '/chat/pinMessage';

export const postChatSendMessage = (
  requestBody: SendMessageDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postChatSendMessage.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postChatSendMessage.key = '/chat/sendMessage';

export const postChatUploadFile = (
  requestBody: {
    conversationId?: string;
    /**
     *
     * - Format: binary
     */
    file?: string;
  },
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postChatUploadFile.key,
    undefined,
    objToForm(requestBody),
    _CONSTANT1,
    overrideConfig(_CONSTANT2, configOverride),
  );
};

/** Key is end point string without base url */
postChatUploadFile.key = '/chat/uploadFile';

export const postLogin = (
  requestBody: LoginUserDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postLogin.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postLogin.key = '/login';

export const postLoginCheckCode = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postLoginCheckCode.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postLoginCheckCode.key = '/login/checkCode';

export const postLoginCheckPassword = (
  requestBody: LoginPasswordDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postLoginCheckPassword.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postLoginCheckPassword.key = '/login/checkPassword';

/**
 *
 * authToken
 */
export const postLoginCheckUserName = (
  requestBody: LoginUserNameDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postLoginCheckUserName.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postLoginCheckUserName.key = '/login/checkUserName';

export const postLoginForgetPassword = (
  requestBody: ForgetPasswordDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postLoginForgetPassword.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postLoginForgetPassword.key = '/login/forgetPassword';

export const putAdminUpdateChannelAndGroup = (
  requestBody: UpdateChannelAdnGroupDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.putRequest(
    putAdminUpdateChannelAndGroup.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putAdminUpdateChannelAndGroup.key = '/admin/updateChannelAndGroup';

export const putAdminUpdateUserProfileByAdmin = (
  requestBody: UpdateUserProfileByAdminDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.putRequest(
    putAdminUpdateUserProfileByAdmin.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putAdminUpdateUserProfileByAdmin.key = '/admin/updateUserProfileByAdmin';

export const putAuthorityUpdateAccess = (
  requestBody: UpdateAccessDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.putRequest(
    putAuthorityUpdateAccess.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putAuthorityUpdateAccess.key = '/authority/updateAccess';

export const putAuthorityUpdateMandatory = (
  requestBody: UpdateMandatoryDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.putRequest(
    putAuthorityUpdateMandatory.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putAuthorityUpdateMandatory.key = '/authority/updateMandatory';

export const putAuthorityUpdateRole = (
  requestBody: UpdateRoleDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.putRequest(
    putAuthorityUpdateRole.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putAuthorityUpdateRole.key = '/authority/updateRole';

export const putChatLeaveChannelGroup = (
  requestBody: LeaveChannelGroupDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.putRequest(
    putChatLeaveChannelGroup.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putChatLeaveChannelGroup.key = '/chat/leaveChannelGroup';

export const putChatUpdateGroup = (
  requestBody: UpdateGroupDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.putRequest(
    putChatUpdateGroup.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putChatUpdateGroup.key = '/chat/updateGroup';

export const putUserUpdateUserProfile = (
  requestBody: UpdateUserProfileDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.putRequest(
    putUserUpdateUserProfile.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putUserUpdateUserProfile.key = '/user/updateUserProfile';
export const _CONSTANT0 = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
export const _CONSTANT1 = [{ bearer: [] }];
export const _CONSTANT2 = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};
