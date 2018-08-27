package org.heida.service.impl.impl;

import org.heida.dao.UserDao;
import org.heida.model.PageBean;
import org.heida.model.User;
import org.heida.service.impl.OrderService;
import org.heida.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final Integer pageSize = 9;
    @Autowired
    private UserDao userDao;
    @Autowired
    private OrderService orderService;

    @Override
    public User checkLoginUser(User user) {
        return userDao.checkLoginUser(user);
    }

    @Override
    public boolean checkRegisterUser(User user, String pwd) {
        if(user==null){
            return false;
        }else{
            if("".equals(user.getUsername())||"".equals(user.getPassword())
                    ||"".equals(user.getName())||"".equals(user.getPhone())
                    ||"".equals(user.getAddress())||"".equals(user.getEmail())
                    ||"".equals(user.getCode())||"".equals(pwd)){
                if(!pwd.equals(user.getPassword())&&!("".equals(pwd))){
                    user.setPassword("密码不一致!");
                }
                return false;
            }else{
                if(userDao.checkRegisterUser(user)==null){
                    user.setState(1);
                    userDao.addUser(user);
                    return true;
                }else{
                    user.setUsername("用户名已存在!");
                    return false;
                }
            }
        }
    }

    @Override
    public PageBean<User> getPageBean(PageBean<User> pageBean) {
        if(pageBean.getPageNow()==null){
            pageBean.setPageNow(1);
        }
        pageBean.setPageSize(pageSize);
        Integer rowCount = userDao.getRowCount(pageBean);
        pageBean.setRowCount(rowCount);
        if(rowCount%pageSize==0){
            pageBean.setPageCount(rowCount/pageSize);
        }else{
            pageBean.setPageCount(rowCount/pageSize+1);
        }
        if(pageBean.getPageCount()<pageBean.getPageNow()&&pageBean.getPageCount()>0){
            pageBean.setPageNow(pageBean.getPageCount());
        }
        pageBean.setStartLimit((pageBean.getPageNow()-1)*pageSize);
        List<User> userList = userDao.getUserList(pageBean);
        pageBean.setRecordList(userList);
        return pageBean;
    }

    @Override
    public void delUserById(Integer uid) {
        userDao.delUserById(uid);
    }

    @Override
    public Integer getOrderCountByUid(Integer uid) {
        return orderService.getOrderCountByUid(uid);
    }

    @Override
    public User getUserByUid(Integer uid) {
        return userDao.getUserByUid(uid);
    }

    @Override
    public void updateUser(User user) {
        userDao.updateUser(user);
    }

    @Override
    public boolean check(User user){
        if(userDao.checkRegisterUser(user)==null){
            return true;
        }else{
            return false;
        }
    }
}
