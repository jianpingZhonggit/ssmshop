package org.heida.service.impl;

import org.heida.model.PageBean;
import org.heida.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    /**
     *  检查待登录的用户是否合理,若合理(用户名和密码正确),
     *  则返回用户全信息,否则返回null
     * @param user 待检查的用户(只有用户名和密码)
     * @return 用户全信息或null
     */
    User checkLoginUser(User user);

    /**
     * 检查待注册的用户是否合理
     * 1、用户名不存在而且密码和确认密码一致则认为合理
     * 此时返回true,否则返回false
     * @param user 待注册的用户
     * @param pwd 确认密码
     * @return 返回待注册用户是否合理
     */
    boolean checkRegisterUser(User user, String pwd);

    PageBean<User> getPageBean(PageBean<User> pageBean);

    void delUserById(Integer uid);

    Integer getOrderCountByUid(Integer uid);

    User getUserByUid(Integer uid);

    void updateUser(User user);

    boolean check(User user);
}
