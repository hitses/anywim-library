import { UserResponseDto } from './user-response.dto.';

export class CheckResponseDto {
  user: UserResponseDto;

  token: string;
}
