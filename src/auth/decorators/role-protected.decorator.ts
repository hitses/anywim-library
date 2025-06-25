import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

export const RoleProtected = () => {
  return SetMetadata(META_ROLES, []);
};
