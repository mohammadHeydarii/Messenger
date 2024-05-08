//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import { AxiosRequestConfig } from 'axios';
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
  QueryClient,
  QueryKey,
} from '@tanstack/react-query';
import { RequestError, SwaggerResponse } from './config';

import type {
  AddNewAccessDto,
  AddNewChannelDto,
  AddNewConversationDto,
  AddNewGroupDto,
  AddNewMandatoryDto,
  AddNewRoleDto,
  AddNewUserDto,
  DeleteAdminDeleteUserQueryParams,
  DeleteAuthorityDeleteMandatoryQueryParams,
  DeleteChatDeleteFileQueryParams,
  DeleteConversationsDto,
  DeleteMessageDto,
  EditMessageDto,
  ForgetPasswordDto,
  ForwardMessageDto,
  GetAdminGetAllChannelsListQueryParams,
  GetAdminGetAllGroupsListQueryParams,
  GetAdminGetUserProfileByAdminQueryParams,
  GetAdminUsersListQueryParams,
  GetAuthorityAccessListQueryParams,
  GetAuthorityAuthorityListQueryParams,
  GetAuthorityFindRolesQueryParams,
  GetAuthorityGetAccessByIdQueryParams,
  GetAuthorityGetMandatoryListQueryParams,
  GetAuthorityGetRoleByIdQueryParams,
  GetChatConversationMessagesQueryParams,
  GetChatFindConversationsQueryParams,
  GetChatGetAllMessagesQueryParams,
  GetChatGoToReplyMessageQueryParams,
  GetChatSearchMessageInConversationQueryParams,
  GetUserFindUserQueryParams,
  LeaveChannelGroupDto,
  LoginPasswordDto,
  LoginUserDto,
  LoginUserNameDto,
  PinMessageDto,
  SendMessageDto,
  UpdateAccessDto,
  UpdateChannelAdnGroupDto,
  UpdateGroupDto,
  UpdateMandatoryDto,
  UpdateRoleDto,
  UpdateUserPasswordDto,
  UpdateUserProfileByAdminDto,
  UpdateUserProfileDto,
  UpdateUserStatusDto,
} from './types';
import {
  deleteAdminDeleteUser,
  deleteAuthorityDeleteMandatory,
  deleteChatDeleteConversation,
  deleteChatDeleteFile,
  deleteChatDeleteMessage,
  getAdminGetAllChannelsList,
  getAdminGetAllGroupsList,
  getAdminGetUserProfileByAdmin,
  getAdminUsersList,
  getAuthorityAccessList,
  getAuthorityAuthorityList,
  getAuthorityFindPermissions,
  getAuthorityFindRoles,
  getAuthorityGetAccessById,
  getAuthorityGetMandatoryList,
  getAuthorityGetRoleById,
  getChatConversationMessages,
  getChatFindConversations,
  getChatGetAllMessages,
  getChatGoToReplyMessage,
  getChatSearchMessageInConversation,
  getLoginAccessToken,
  getLoginLogout,
  getUserFindUser,
  getUserGetUserAvatar,
  getUserGetUserProfile,
  patchUserUpdateAvatar,
  patchUserUpdateUserPassword,
  patchUserUpdateUserStatus,
  postAdminAddNewChannel,
  postAdminAddNewUser,
  postAuthorityAddMandatory,
  postAuthorityAddNewAccess,
  postAuthorityAddNewRole,
  postChatAddNewConversation,
  postChatAddNewGroup,
  postChatEditMessage,
  postChatForwardMessage,
  postChatPinMessage,
  postChatSendMessage,
  postChatUploadFile,
  postLogin,
  postLoginCheckCode,
  postLoginCheckPassword,
  postLoginCheckUserName,
  postLoginForgetPassword,
  putAdminUpdateChannelAndGroup,
  putAdminUpdateUserProfileByAdmin,
  putAuthorityUpdateAccess,
  putAuthorityUpdateMandatory,
  putAuthorityUpdateRole,
  putChatLeaveChannelGroup,
  putChatUpdateGroup,
  putUserUpdateUserProfile,
} from './services';

export type SwaggerTypescriptMutationDefaultParams<TExtra> = {
  _extraVariables?: TExtra;
  configOverride?: AxiosRequestConfig;
};
type SwaggerTypescriptUseQueryOptions<TData> = Omit<
  UseQueryOptions<SwaggerResponse<TData>, RequestError | Error>,
  'queryKey'
>;

type SwaggerTypescriptUseMutationOptions<TData, TRequest, TExtra> =
  UseMutationOptions<
    SwaggerResponse<TData>,
    RequestError | Error,
    TRequest & SwaggerTypescriptMutationDefaultParams<TExtra>
  >;

type SwaggerTypescriptUseMutationOptionsVoid<TData, TExtra> =
  UseMutationOptions<
    SwaggerResponse<TData>,
    RequestError | Error,
    SwaggerTypescriptMutationDefaultParams<TExtra> | void
  >;

export const useDeleteAdminDeleteUser = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { queryParams: DeleteAdminDeleteUserQueryParams },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { queryParams, configOverride } = _o || {};

      return deleteAdminDeleteUser(queryParams, configOverride);
    },
    ...options,
  });
};

export const useDeleteAuthorityDeleteMandatory = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { queryParams: DeleteAuthorityDeleteMandatoryQueryParams },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { queryParams, configOverride } = _o || {};

      return deleteAuthorityDeleteMandatory(queryParams, configOverride);
    },
    ...options,
  });
};

export const useDeleteChatDeleteConversation = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: DeleteConversationsDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return deleteChatDeleteConversation(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteChatDeleteFile = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { queryParams: DeleteChatDeleteFileQueryParams },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { queryParams, configOverride } = _o || {};

      return deleteChatDeleteFile(queryParams, configOverride);
    },
    ...options,
  });
};

export const useDeleteChatDeleteMessage = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: DeleteMessageDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return deleteChatDeleteMessage(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const useGetAdminGetAllChannelsList = (
  queryParams: GetAdminGetAllChannelsListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAdminGetAllChannelsList.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAdminGetAllChannelsList.info = (
  queryParams: GetAdminGetAllChannelsListQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAdminGetAllChannelsList.key, queryParams] as QueryKey,
    fun: () =>
      getAdminGetAllChannelsList(
        queryParams,

        configOverride,
      ),
  };
};
useGetAdminGetAllChannelsList.prefetch = (
  client: QueryClient,
  queryParams: GetAdminGetAllChannelsListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAdminGetAllChannelsList.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAdminGetAllGroupsList = (
  queryParams: GetAdminGetAllGroupsListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAdminGetAllGroupsList.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAdminGetAllGroupsList.info = (
  queryParams: GetAdminGetAllGroupsListQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAdminGetAllGroupsList.key, queryParams] as QueryKey,
    fun: () =>
      getAdminGetAllGroupsList(
        queryParams,

        configOverride,
      ),
  };
};
useGetAdminGetAllGroupsList.prefetch = (
  client: QueryClient,
  queryParams: GetAdminGetAllGroupsListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAdminGetAllGroupsList.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAdminGetUserProfileByAdmin = (
  queryParams?: GetAdminGetUserProfileByAdminQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAdminGetUserProfileByAdmin.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAdminGetUserProfileByAdmin.info = (
  queryParams?: GetAdminGetUserProfileByAdminQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAdminGetUserProfileByAdmin.key, queryParams] as QueryKey,
    fun: () =>
      getAdminGetUserProfileByAdmin(
        queryParams,

        configOverride,
      ),
  };
};
useGetAdminGetUserProfileByAdmin.prefetch = (
  client: QueryClient,
  queryParams?: GetAdminGetUserProfileByAdminQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAdminGetUserProfileByAdmin.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * list of all users.
 */
export const useGetAdminUsersList = (
  queryParams: GetAdminUsersListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAdminUsersList.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAdminUsersList.info = (
  queryParams: GetAdminUsersListQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAdminUsersList.key, queryParams] as QueryKey,
    fun: () =>
      getAdminUsersList(
        queryParams,

        configOverride,
      ),
  };
};
useGetAdminUsersList.prefetch = (
  client: QueryClient,
  queryParams: GetAdminUsersListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAdminUsersList.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAuthorityAccessList = (
  queryParams: GetAuthorityAccessListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityAccessList.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAuthorityAccessList.info = (
  queryParams: GetAuthorityAccessListQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAuthorityAccessList.key, queryParams] as QueryKey,
    fun: () =>
      getAuthorityAccessList(
        queryParams,

        configOverride,
      ),
  };
};
useGetAuthorityAccessList.prefetch = (
  client: QueryClient,
  queryParams: GetAuthorityAccessListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityAccessList.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAuthorityAuthorityList = (
  queryParams: GetAuthorityAuthorityListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityAuthorityList.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAuthorityAuthorityList.info = (
  queryParams: GetAuthorityAuthorityListQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAuthorityAuthorityList.key, queryParams] as QueryKey,
    fun: () =>
      getAuthorityAuthorityList(
        queryParams,

        configOverride,
      ),
  };
};
useGetAuthorityAuthorityList.prefetch = (
  client: QueryClient,
  queryParams: GetAuthorityAuthorityListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityAuthorityList.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAuthorityFindPermissions = (
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityFindPermissions.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAuthorityFindPermissions.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getAuthorityFindPermissions.key] as QueryKey,
    fun: () => getAuthorityFindPermissions(configOverride),
  };
};
useGetAuthorityFindPermissions.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityFindPermissions.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAuthorityFindRoles = (
  queryParams: GetAuthorityFindRolesQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityFindRoles.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAuthorityFindRoles.info = (
  queryParams: GetAuthorityFindRolesQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAuthorityFindRoles.key, queryParams] as QueryKey,
    fun: () =>
      getAuthorityFindRoles(
        queryParams,

        configOverride,
      ),
  };
};
useGetAuthorityFindRoles.prefetch = (
  client: QueryClient,
  queryParams: GetAuthorityFindRolesQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityFindRoles.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAuthorityGetAccessById = (
  queryParams: GetAuthorityGetAccessByIdQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityGetAccessById.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAuthorityGetAccessById.info = (
  queryParams: GetAuthorityGetAccessByIdQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAuthorityGetAccessById.key, queryParams] as QueryKey,
    fun: () =>
      getAuthorityGetAccessById(
        queryParams,

        configOverride,
      ),
  };
};
useGetAuthorityGetAccessById.prefetch = (
  client: QueryClient,
  queryParams: GetAuthorityGetAccessByIdQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityGetAccessById.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAuthorityGetMandatoryList = (
  queryParams: GetAuthorityGetMandatoryListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityGetMandatoryList.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAuthorityGetMandatoryList.info = (
  queryParams: GetAuthorityGetMandatoryListQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAuthorityGetMandatoryList.key, queryParams] as QueryKey,
    fun: () =>
      getAuthorityGetMandatoryList(
        queryParams,

        configOverride,
      ),
  };
};
useGetAuthorityGetMandatoryList.prefetch = (
  client: QueryClient,
  queryParams: GetAuthorityGetMandatoryListQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityGetMandatoryList.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAuthorityGetRoleById = (
  queryParams: GetAuthorityGetRoleByIdQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityGetRoleById.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAuthorityGetRoleById.info = (
  queryParams: GetAuthorityGetRoleByIdQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAuthorityGetRoleById.key, queryParams] as QueryKey,
    fun: () =>
      getAuthorityGetRoleById(
        queryParams,

        configOverride,
      ),
  };
};
useGetAuthorityGetRoleById.prefetch = (
  client: QueryClient,
  queryParams: GetAuthorityGetRoleByIdQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAuthorityGetRoleById.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetChatConversationMessages = (
  queryParams: GetChatConversationMessagesQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatConversationMessages.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetChatConversationMessages.info = (
  queryParams: GetChatConversationMessagesQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getChatConversationMessages.key, queryParams] as QueryKey,
    fun: () =>
      getChatConversationMessages(
        queryParams,

        configOverride,
      ),
  };
};
useGetChatConversationMessages.prefetch = (
  client: QueryClient,
  queryParams: GetChatConversationMessagesQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatConversationMessages.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetChatFindConversations = (
  queryParams: GetChatFindConversationsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatFindConversations.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetChatFindConversations.info = (
  queryParams: GetChatFindConversationsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getChatFindConversations.key, queryParams] as QueryKey,
    fun: () =>
      getChatFindConversations(
        queryParams,

        configOverride,
      ),
  };
};
useGetChatFindConversations.prefetch = (
  client: QueryClient,
  queryParams: GetChatFindConversationsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatFindConversations.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetChatGetAllMessages = (
  queryParams: GetChatGetAllMessagesQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatGetAllMessages.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetChatGetAllMessages.info = (
  queryParams: GetChatGetAllMessagesQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getChatGetAllMessages.key, queryParams] as QueryKey,
    fun: () =>
      getChatGetAllMessages(
        queryParams,

        configOverride,
      ),
  };
};
useGetChatGetAllMessages.prefetch = (
  client: QueryClient,
  queryParams: GetChatGetAllMessagesQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatGetAllMessages.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetChatGoToReplyMessage = (
  queryParams: GetChatGoToReplyMessageQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatGoToReplyMessage.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetChatGoToReplyMessage.info = (
  queryParams: GetChatGoToReplyMessageQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getChatGoToReplyMessage.key, queryParams] as QueryKey,
    fun: () =>
      getChatGoToReplyMessage(
        queryParams,

        configOverride,
      ),
  };
};
useGetChatGoToReplyMessage.prefetch = (
  client: QueryClient,
  queryParams: GetChatGoToReplyMessageQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatGoToReplyMessage.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetChatSearchMessageInConversation = (
  queryParams: GetChatSearchMessageInConversationQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatSearchMessageInConversation.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetChatSearchMessageInConversation.info = (
  queryParams: GetChatSearchMessageInConversationQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getChatSearchMessageInConversation.key, queryParams] as QueryKey,
    fun: () =>
      getChatSearchMessageInConversation(
        queryParams,

        configOverride,
      ),
  };
};
useGetChatSearchMessageInConversation.prefetch = (
  client: QueryClient,
  queryParams: GetChatSearchMessageInConversationQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatSearchMessageInConversation.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetLoginAccessToken = (
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetLoginAccessToken.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetLoginAccessToken.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getLoginAccessToken.key] as QueryKey,
    fun: () => getLoginAccessToken(configOverride),
  };
};
useGetLoginAccessToken.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetLoginAccessToken.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetLoginLogout = (
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetLoginLogout.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetLoginLogout.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getLoginLogout.key] as QueryKey,
    fun: () => getLoginLogout(configOverride),
  };
};
useGetLoginLogout.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetLoginLogout.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetUserFindUser = (
  queryParams: GetUserFindUserQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserFindUser.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUserFindUser.info = (
  queryParams: GetUserFindUserQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getUserFindUser.key, queryParams] as QueryKey,
    fun: () =>
      getUserFindUser(
        queryParams,

        configOverride,
      ),
  };
};
useGetUserFindUser.prefetch = (
  client: QueryClient,
  queryParams: GetUserFindUserQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserFindUser.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Get user avatar .
 */
export const useGetUserGetUserAvatar = (
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserGetUserAvatar.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUserGetUserAvatar.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUserGetUserAvatar.key] as QueryKey,
    fun: () => getUserGetUserAvatar(configOverride),
  };
};
useGetUserGetUserAvatar.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserGetUserAvatar.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Get user profile information .
 */
export const useGetUserGetUserProfile = (
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserGetUserProfile.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUserGetUserProfile.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUserGetUserProfile.key] as QueryKey,
    fun: () => getUserGetUserProfile(configOverride),
  };
};
useGetUserGetUserProfile.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserGetUserProfile.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const usePatchUserUpdateAvatar = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    {
      requestBody: {
        /**
         *
         * - Format: binary
         */
        file?: string;
      };
    },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return patchUserUpdateAvatar(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * change user password.
 */
export const usePatchUserUpdateUserPassword = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateUserPasswordDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return patchUserUpdateUserPassword(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * update user status (online,offline,..).
 */
export const usePatchUserUpdateUserStatus = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateUserStatusDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return patchUserUpdateUserStatus(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAdminAddNewChannel = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: AddNewChannelDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAdminAddNewChannel(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * create new user by admin or operator.
 */
export const usePostAdminAddNewUser = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: AddNewUserDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAdminAddNewUser(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthorityAddMandatory = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: AddNewMandatoryDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthorityAddMandatory(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthorityAddNewAccess = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: AddNewAccessDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthorityAddNewAccess(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthorityAddNewRole = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: AddNewRoleDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthorityAddNewRole(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostChatAddNewConversation = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: AddNewConversationDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postChatAddNewConversation(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostChatAddNewGroup = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: AddNewGroupDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postChatAddNewGroup(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostChatEditMessage = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: EditMessageDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postChatEditMessage(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostChatForwardMessage = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: ForwardMessageDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postChatForwardMessage(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostChatPinMessage = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: PinMessageDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postChatPinMessage(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostChatSendMessage = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: SendMessageDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postChatSendMessage(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostChatUploadFile = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    {
      requestBody: {
        conversationId?: string;
        /**
         *
         * - Format: binary
         */
        file?: string;
      };
    },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postChatUploadFile(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostLogin = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: LoginUserDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postLogin(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostLoginCheckCode = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<any, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return postLoginCheckCode(configOverride);
    },
    ...options,
  });
};

export const usePostLoginCheckPassword = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: LoginPasswordDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postLoginCheckPassword(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * authToken
 */
export const usePostLoginCheckUserName = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: LoginUserNameDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postLoginCheckUserName(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostLoginForgetPassword = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: ForgetPasswordDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postLoginForgetPassword(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutAdminUpdateChannelAndGroup = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateChannelAdnGroupDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putAdminUpdateChannelAndGroup(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutAdminUpdateUserProfileByAdmin = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateUserProfileByAdminDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putAdminUpdateUserProfileByAdmin(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutAuthorityUpdateAccess = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateAccessDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putAuthorityUpdateAccess(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutAuthorityUpdateMandatory = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateMandatoryDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putAuthorityUpdateMandatory(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutAuthorityUpdateRole = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateRoleDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putAuthorityUpdateRole(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutChatLeaveChannelGroup = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: LeaveChannelGroupDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putChatLeaveChannelGroup(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutChatUpdateGroup = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateGroupDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putChatUpdateGroup(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutUserUpdateUserProfile = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: UpdateUserProfileDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putUserUpdateUserProfile(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};
