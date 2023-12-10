import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  usersRepository = new UsersRepository();

    //내정보 조회
  findUserInfo = async ( userId ) => {
    const userInfo = await this.usersRepository.findUserInfo( userId );

      return {
        userInfoId: userInfo.userInfoId,
        UserId: userInfo.UserId,
        name: userInfo.name,
        age: userInfo.age,
        gender: userInfo.gender,
        profileImage: userInfo.profileImage,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt,
      };
  
  };
//내정보 수정
  updateUserInfo= async (userId, updatedUserInfo ) => {
    const user = await this.usersRepository.findUserInfo( userId );

    if (!user) throw new Error("존재하지 않는 유저입니다.");

    //사용자 정보 업데이트
    await this.usersRepository.updateUserInfo( UserId, userInfoId, name, age, gender, profileImage );

    const updatedUser = await this.usersRepository.updateUserInfo( userId, updatedUserInfo);

    return {
      UserId: updatedUser.userId,
      userInfoId:updatedUser.userInfoId,
      name: updatedUser.name,
      age: updatedUser.age,
      gender: updatedUser.gender,
      profileImage: updatedUser.profileImage,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  };

}
