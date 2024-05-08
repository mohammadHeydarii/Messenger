//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

export interface AddNewAccessDto {
  authorities: string[];
  role1: string;
  role2: string;
  user1: string;
  user2: string;
}

export interface AddNewChannelDto {
  isMandatory: boolean;
  title: string;
  admins?: string[];
  userGroupsName?: string[];
  users?: string[];
}

export interface AddNewConversationDto {
  userNames: string;
}

export interface AddNewGroupDto {
  isMandatory: boolean;
  participants: string[];
  title: string;
}

export interface AddNewMandatoryDto {
  conversationId: string;
  roleId: string;
  userName: string;
}

export interface AddNewRoleDto {
  name: string;
  permissions: string[];
}

export interface AddNewUserDto {
  group: string;
  isActive: boolean;
  mobileNumber: string;
  nameAndFamily: string;
  password: string;
  role: string[];
  userName: string;
}

export interface AttachmentDto {
  key: string;
  type: string;
}

export interface DeleteAdminDeleteUserQueryParams {
  userName: string;
}

export interface DeleteAuthorityDeleteMandatoryQueryParams {
  mandatoryId: string;
}

export interface DeleteChatDeleteFileQueryParams {
  fileName: string;
}

export interface DeleteConversationsDto {
  conversationId: string;
}

export interface DeleteMessageDto {
  conversationId: string;
  messageIds: string[];
}

export interface EditMessageDto {
  content: string;
  messageId: string;
}

export interface ErrorResponseDto {
  /**
   * @example
   *   Some specific code
   */
  code_error: number;
  /**
   * @example
   *   Some error details
   */
  error: string;
  /**
   * @example
   *   Bad Request
   */
  message: string;
  /**
   * @example
   *   400
   */
  statusCode: number;
}

export interface ForgetPasswordDto {
  userName: string;
}

export interface ForwardMessageDto {
  messageIds: string[];
  toConversationIds: string[];
}

export interface GetAdminGetAllChannelsListQueryParams {
  pageNumber: string;
  pageSize: string;
  channelId?: string;
  channelName?: string;
}

export interface GetAdminGetAllGroupsListQueryParams {
  pageNumber: string;
  pageSize: string;
  groupId?: string;
  groupName?: string;
}

export interface GetAdminGetUserProfileByAdminQueryParams {
  contactInfo?: string;
  userId?: string;
}

export interface GetAdminUsersListQueryParams {
  pageNumber: string;
  pageSize: string;
  mobileNumber?: string;
  nameAndFamily?: string;
  userName?: string;
}

export interface GetAuthorityAccessListQueryParams {
  pageNumber: string;
  pageSize: string;
  accessId?: string;
}

export interface GetAuthorityAuthorityListQueryParams {
  pageNumber: string;
  pageSize: string;
}

export interface GetAuthorityFindRolesQueryParams {
  pageNumber: string;
  pageSize: string;
  roleName?: string;
}

export interface GetAuthorityGetAccessByIdQueryParams {
  accessId: string;
}

export interface GetAuthorityGetMandatoryListQueryParams {
  pageNumber: string;
  pageSize: string;
  mandatoryId?: string;
}

export interface GetAuthorityGetRoleByIdQueryParams {
  roleId: string;
}

export interface GetChatConversationMessagesQueryParams {
  conversationId: string;
  pageNumber: string;
  pageSize: string;
  messageInfo?: string;
}

export interface GetChatFindConversationsQueryParams {
  pageNumber: string;
  pageSize: string;
  conversationId?: string;
  conversationName?: string;
  type?: string;
  userName?: string;
}

export interface GetChatGetAllMessagesQueryParams {
  pageNumber: string;
  pageSize: string;
  value?: string;
}

export interface GetChatGoToReplyMessageQueryParams {
  conversationId: string;
  messageId: string;
}

export interface GetChatSearchMessageInConversationQueryParams {
  conversationId: string;
  message: string;
}

export interface GetUserFindUserQueryParams {
  pageNumber: string;
  pageSize: string;
  userInfo?: string;
}

export interface LeaveChannelGroupDto {
  conversationId: string;
}

export interface LoginPasswordDto {
  password: string;
}

export interface LoginUserDto {
  password: string;
  userName: string;
}

export interface LoginUserNameDto {
  userName: string;
}

export interface PinMessageDto {
  conversationId: string;
  messageId: string;
  pinned: boolean;
}

export interface ResponseFormat {
  data: { [x in string | number]: any };
  duration: string;
  isArray: boolean;
}

export interface SendMessageDto {
  conversationId: string;
  message: string;
  attachment?: AttachmentDto;
  originalMessageId?: string;
}

export interface UpdateAccessDto {
  accessId: string;
  authorities: string[];
  role1: string;
  role2: string;
  user1: string;
  user2: string;
}

export interface UpdateChannelAdnGroupDto {
  conversationId: string;
  addAdmins?: string[];
  adds?: string[];
  conversationTitle?: string;
  removeAdmins?: string[];
  removes?: string[];
}

export interface UpdateGroupDto {
  conversationId: string;
  addAdmins?: string[];
  adds?: string[];
  conversationTitle?: string;
  removeAdmins?: string[];
  removes?: string[];
}

export interface UpdateMandatoryDto {
  conversationId: string;
  mandatoryId: string;
}

export interface UpdateRoleDto {
  name: string;
  permissions: string[];
  roleId: number;
}

export interface UpdateUserPasswordDto {
  newPassword: string;
  password: string;
}

export interface UpdateUserProfileByAdminDto {
  mainUserName: string;
  email?: string;
  group?: string;
  isActive?: boolean;
  mobileNumber?: string;
  nameAndFamily?: string;
  roles?: string[];
  userName?: string;
}

export interface UpdateUserProfileDto {
  bio: string;
  email: string;
}

export interface UpdateUserStatusDto {
  status: string;
}
