import { UserResponseDto } from './user-response.dto.';

export class RegisterResponseDto {
  user: UserResponseDto;

  token: string;
}
