// needSignin.js
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET } from '../constants/security.constant.js'; // 파일 경로에 맞게 수정
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const needSignin = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(400).json({
        success: false,
        message: '인증 정보가 없습니다.',
      });
    }

    const [tokenType, accessToken] = authorizationHeader?.split(' ');
    console.log(tokenType, accessToken);

    if (tokenType !== 'Bearer') {
      return res.status(400).json({
        success: false,
        message: '지원하지 않는 인증 방식입니다.',
      });
    }

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: 'AccessToken이 없습니다.',
      });
    }

    const decodedPayload = jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET);

    const { userId } = decodedPayload;

    // Prisma로 사용자 조회
    const user = await prisma.users.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: '존재하지 않는 사용자입니다.',
      });
    }

    // 필요한 사용자 정보를 res.locals.user에 저장
    req.user = {
      userId: user.userId,
      email: user.email,
      // ... (다른 필요한 정보 추가)
    };


    next();
  } catch (error) {
    // 검증에 실패한 경우
    console.error(error);

    let statusCode = 500;
    let errorMessage = '';

    switch (error.message) {
      case 'jwt expired':
        statusCode = 401;
        errorMessage = '인증 정보 유효기간이 지났습니다.';
        break;
      case 'invalid signature':
        statusCode = 401;
        errorMessage = '유효하지 않는 인증 정보입니다.';
        break;
      default:
        statusCode = 500;
        errorMessage =
          '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.';
        break;
    }

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  } finally {
    // Prisma 클라이언트 연결 해제
    await prisma.$disconnect();
  }
};
