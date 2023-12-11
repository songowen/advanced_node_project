import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';

export class UsersRepository {
  //내정보 조회
  findUserInfo = async (userId) => {
    const user = await prisma.users.findUnique({
      where: {
        userId: +userId,
      },
    });
    return user;
  };

  //내정보 수정
updateUser = async (userId, updatedUserInfo) => {
  const { name, age, gender, profileImage } = updatedUserInfo;
  const updatedUser = await prisma.userInfos.update({
    where: {
      userId: +userId,
    },
    data: {
      name,
      age,
      gender,
      profileImage,
    },
  });
  return updatedUser;
};

  // 회원가입
  createUser = async (email, password, name) => {
    const createdUser = await prisma.users.create({
      data: {
        email,
        password,
        name,
      },
    });
    return createdUser;
  };

  //로그인

  findByEmail = async (email, password) => {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      console.log('password', password);
      console.log('user.password', user.password);
      console.log('User Object:', user);

      if (bcrypt.compareSync(password, user.password)) {
        return user;
      } else {
        console.log('Password does not match');
        return null;
      }
    } else {
      console.log('User not found');
      return null;
    }
  };
}
