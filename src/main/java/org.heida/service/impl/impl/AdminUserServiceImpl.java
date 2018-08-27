package org.heida.service.impl.impl;

import org.heida.dao.AdminUserDao;
import org.heida.model.AdminUser;
import org.heida.service.impl.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminUserServiceImpl implements AdminUserService {
    @Autowired
    private AdminUserDao adminUserDao;

    @Override
    public AdminUser checkAdminUser(AdminUser adminUser) {
        if(adminUser.getUsername()==null
                ||adminUser.getPassword()==null){
            return null;
        }
        return adminUserDao.getAdminUser(adminUser);
    }

    @Override
    public void updateAdminUser(AdminUser adminUser) {
        adminUserDao.updateAdminUser(adminUser);
    }
}
