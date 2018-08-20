package org.heida.dao;

import org.heida.model.PageBean;
import org.heida.model.User;

import java.util.List;

public interface UserDao {
    /**
     * 检查登录的用户是否合理
     * @param user 待检查的登录用户(只包含用户名和密码)
     * @return 若用户名和密码正确则返回用户完整信息,否则返回null
     */
    User checkLoginUser(User user);

    /**
     * 检查待注册的用户是否合理(即用户名是否可用)
     * @param user 待注册的用户对象
     * @return 若存在则返回已存在的用户信息,否则返回null
     */
    User checkRegisterUser(User user);

    /**
     * 添加用户
     * @param user 待添加的用户对象
     */
    void addUser(User user);

    Integer getRowCount(PageBean<User> pageBean);
    List<User> getUserList(PageBean<User> pageBean);

    void delUserById(Integer uid);

    User getUserByUid(Integer uid);

    void updateUser(User user);
}
