import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET } from '../constants/security.constant.js';
import { UsersRepository } from '../repositories/users.repository.js';

export class AuthService {
  usersRepository = new UsersRepository();

    // 회원 가입
    signUp = async (email, password, name) => {
      // 비밀번호 암호화
      const hashedPassword = bcrypt.hashSync(password, 10);

      // 사용자 생성
      const createdUser = await this.usersRepository.createUser(
        email,
        hashedPassword,
        name
      );

      // 생성된 사용자 정보 반환
      return {
        userId: createdUser.userId,
        email: createdUser.email,
        name:createdUser.name,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      };
    };

    // 로그인
signIn = async (email, password) => {
  // 사용자 조회

  const user = await this.usersRepository.findByEmail(email);

  // 사용자가 존재하지 않으면 오류 처리
if (!user) {
  throw new Error('User not found');
}
  // 사용자가 존재하지 않거나 비밀번호가 일치하지 않으면 오류 처리
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  // JWT 토큰 생성
  const accessToken = jwt.sign(
    { userId: user.userId },
    JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: '12h', // 토큰 유효 기간 설정 (예: 12시간)
    },
  );

  return { accessToken };
};

  //비밀번호 해싱
  hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };

}
