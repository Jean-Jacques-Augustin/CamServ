/**
 * name, email, adresse, phone, password,role, status, createdAt, updatedAt
 */
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly address: string;
  readonly phone: number;
  readonly password: string;
  readonly role: string;
  readonly status: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
