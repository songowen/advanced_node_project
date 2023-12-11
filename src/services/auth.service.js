import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET, PASSWORD_HASH_SALT_ROUNDS,JWT_ACCESS_TOKEN_EXPIRES_IN} from '../constants/security.constant.js';
import { UsersRepository } from '../repositories/users.repository.js';

export class AuthService {
  usersRepository = new UsersRepository();

  // 회원 가입
  signUp = async (email, password, passwordConfirm, name) => {
     // 비밀번호 암호화
     const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);
    
   
    const existingUser = await this.usersRepository.findByEmail(email,password);
   
    if (existingUser) {
      const errEmailDuplicated = new Error('해당 이메일이 이미 사용 중입니다.');
      errEmailDuplicated.status = 401;
      throw errEmailDuplicated;
    }  

    if (password.length < 6) {
      const errPasswordDigit6 = new Error(
        '비밀번호가 6자리 이상이어야 합니다.',
      );
      errPasswordDigit6.status = 401;
      throw errPasswordDigit6;
    }

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      });
    }

    // 사용자 생성
    const createdUser = await this.usersRepository.createUser(
      email,
      hashedPassword,
      name,
    );

    // 생성된 사용자 정보 반환
    return {
      userId: createdUser.userId,
      email: createdUser.email,
      name: createdUser.name,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
  };

  // 로그인
  signIn = async (email, password) => {
    // 사용자 조회

    const user = await this.usersRepository.findByEmail(email,password);

    // 사용자가 존재하지 않으면 오류 처리
    if (!user) {
      throw new Error('사용자가 존재하지 않습니다.');
    }
    
    // 사용자가 존재하지 않거나 비밀번호가 일치하지 않으면 오류 처리
    const matchPassword = await bcrypt.compare(password, user.password);
    console.log('password, user.password',password, user.password)
		if (!matchPassword) {
      throw new Error('비밀번호가 일치하지 않습니다.');
		}

    // JWT 토큰 생성
    const accessToken = jwt.sign(
      { userId: user.userId },
      JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN, // 토큰 유효 기간 설정 (예: 12시간)
      },
    );

    return { accessToken };
  };


}
