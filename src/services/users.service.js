import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  usersRepository = new UsersRepository();

    //내정보 조회
    getUser = async ( userId ) => {
    const userInfo = await this.usersRepository.findUserInfo( userId );

    if (!userInfo) {
			const errUserNotExist = new Error('유저를 찾을 수 없습니다.');
			errUserNotExist.status = 404;
			throw new errUserNotExist
		}

		return { userInfo };
     
  };
//내정보 수정
updateUserInfo = async (userId, updatedUserInfo) => {
  const user = await this.usersRepository.findUserInfo(userId);

  if (!user) throw new Error("존재하지 않는 유저입니다.");

  //사용자 정보 업데이트
  const updatedUser = await this.usersRepository.updateUser(userId, updatedUserInfo);

  return {
    UserId: updatedUser.userId,
    userInfoId: updatedUser.userInfoId,
    name: updatedUser.name,
    age: updatedUser.age,
    gender: updatedUser.gender,
    profileImage: updatedUser.profileImage,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  };
};

}
